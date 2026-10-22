#!/usr/bin/env bash
# Выкладка проекта на сервер без GitHub и без Docker Hub на сервере.
#
#   ./deploy.sh                    # backend + frontend
#   ./deploy.sh frontend           # только frontend
#   ./deploy.sh backend            # только backend
#
# Что делает:
#   1. копирует файлы из git (git ls-files) в $DEPLOY_DIR на сервере;
#      .env на сервере не трогается (его нет в git);
#   2. собирает образы локально;
#   3. передаёт по SSH только те образы, которые отличаются от серверных;
#   4. перезапускает контейнеры на сервере (без сборки там).
#
# Настройки (можно переопределить переменными окружения):
DEPLOY_HOST="${DEPLOY_HOST:-user@195.158.27.186}"
DEPLOY_PORT="${DEPLOY_PORT:-52230}"
DEPLOY_DIR="${DEPLOY_DIR:-ndktu_official_website}"   # относительно домашней папки на сервере

set -euo pipefail
cd "$(dirname "$0")"

SERVICES=("$@")
[ ${#SERVICES[@]} -eq 0 ] && SERVICES=(backend frontend)

# Одно SSH-соединение на весь скрипт — пароль спрашивается один раз.
CM_DIR=$(mktemp -d)
trap 'ssh -O exit -o ControlPath="$CM_DIR/cm" -p "$DEPLOY_PORT" "$DEPLOY_HOST" 2>/dev/null || true; rm -rf "$CM_DIR"' EXIT
SSH=(ssh -o ControlMaster=auto -o ControlPath="$CM_DIR/cm" -o ControlPersist=10m -p "$DEPLOY_PORT" "$DEPLOY_HOST")
remote() { "${SSH[@]}" "$@"; }

if [ -n "$(git status --porcelain)" ]; then
    echo "⚠  Есть незакоммиченные изменения — на сервер уйдёт текущее состояние файлов:"
    git status -s
    read -rp "Продолжить? [y/N] " a; [ "$a" = y ] || exit 1
fi

echo "==> Подключение к $DEPLOY_HOST:$DEPLOY_PORT"
remote "test -f ~/$DEPLOY_DIR/.env" || { echo "Нет ~/$DEPLOY_DIR/.env на сервере — создайте его по .env.example"; exit 1; }
COMPOSE=$(remote 'docker compose version >/dev/null 2>&1 && echo "docker compose" || echo docker-compose')

echo "==> 1/4 Копирую код ($(git ls-files | wc -l) файлов)"
git ls-files -z | tar --null -czf - -T - | remote "mkdir -p ~/$DEPLOY_DIR && tar -xzf - -C ~/$DEPLOY_DIR"
# Удаляем на сервере файлы, которые раньше выкладывались этим скриптом, а теперь удалены из git.
git ls-files > "$CM_DIR/files"
remote "cd ~/$DEPLOY_DIR && cat > .deployed-files.new && if [ -f .deployed-files ]; then
          comm -23 <(sort .deployed-files) <(sort .deployed-files.new) | while IFS= read -r f; do [ -n \"\$f\" ] && rm -f -- \"\$f\" && echo \"   удалён: \$f\"; done
        fi; mv .deployed-files.new .deployed-files" < "$CM_DIR/files"

echo "==> 2/4 Собираю образы локально: ${SERVICES[*]}"
docker compose build "${SERVICES[@]}"

echo "==> 3/4 Передаю изменившиеся образы"
for s in "${SERVICES[@]}"; do
    img="ndktu_site-$s:latest"
    # Сравниваем слои, а не .Id: при разных хранилищах образов (containerd локально,
    # классическое на сервере) .Id одного и того же образа отличается.
    local_id=$(docker image inspect -f '{{json .RootFS.Layers}}' "$img" | md5sum)
    remote_id=$(remote "docker image inspect -f '{{json .RootFS.Layers}}' $img 2>/dev/null | md5sum")
    if [ "$local_id" = "$remote_id" ]; then
        echo "   $s: без изменений"
    else
        echo "   $s: передаю ($(docker image inspect -f '{{.Size}}' "$img" | awk '{printf "%.0f MB", $1/1048576}'))…"
        docker save "$img" | gzip | remote 'gunzip | docker load' | sed 's/^/   /'
    fi
done

echo "==> 4/4 Перезапускаю контейнеры"
remote "cd ~/$DEPLOY_DIR && $COMPOSE up -d --no-build ${SERVICES[*]} && docker image prune -f >/dev/null && $COMPOSE ps"

echo "✔ Готово"
