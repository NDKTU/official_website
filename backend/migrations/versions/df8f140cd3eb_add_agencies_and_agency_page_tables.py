"""add agencies and agency_page tables (no-op)

Таблицы agencies и agency_page создаёт миграция 3f3669f45f8b.
Эта ревизия появилась параллельно с ней и уже записана в alembic_version
на продакшне, поэтому её нельзя удалить — она оставлена пустым шагом
после 3f3669f45f8b, чтобы у alembic была одна голова:
  - продакшн (df8f140cd3eb): ничего не выполняется;
  - базы на 3f3669f45f8b: применяется пустой шаг;
  - новые базы: таблицы создаёт 3f3669f45f8b.

Revision ID: df8f140cd3eb
Revises: 3f3669f45f8b
Create Date: 2026-10-02 18:38:31.815089

"""
from typing import Sequence, Union


# revision identifiers, used by Alembic.
revision: str = 'df8f140cd3eb'
down_revision: Union[str, None] = '3f3669f45f8b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
