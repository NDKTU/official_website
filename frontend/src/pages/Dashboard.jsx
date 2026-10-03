import { useState } from "react";
import { formatDate, formatMonth } from "../utils/date";
import { Link } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import {
  GraduationCap,
  Building2,
  Layers3,
  BookOpen,
  Files,
  Newspaper,
  ArrowUpRight,
  Plus,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import { GetAllFaculty } from "../Api/FacultyApi";
import { GetAllDepartment } from "../Api/DepartmentApi";
import { GetAllCategory } from "../Api/CategoryApi";
import { GetAllFacultyPage } from "../Api/FacultyPageApi";
import { GetAllDepartmentPage } from "../Api/DepartmentPageApi";
import { GetAllNews } from "../Api/NewsPageApi";

const metrics = [
  {
    title: "Fakultetlar",
    key: "list-faculty",
    get: GetAllFaculty,
    icon: GraduationCap,
    color: "orange",
    path: "/list-faculty",
  },
  {
    title: "Kafedralar",
    key: "list-department",
    get: GetAllDepartment,
    icon: Building2,
    color: "blue",
    path: "/list-department",
  },
  {
    title: "Kategoriyalar",
    key: "list-category",
    get: GetAllCategory,
    icon: Layers3,
    color: "purple",
    path: "/list-category",
  },
  {
    title: "Fakultet sahifalari",
    key: "list-faculty-page",
    get: GetAllFacultyPage,
    icon: BookOpen,
    color: "teal",
    path: "/list-faculty-page",
  },
  {
    title: "Kafedra sahifalari",
    key: "list-department-page",
    get: GetAllDepartmentPage,
    icon: Files,
    color: "green",
    path: "/list-department-page",
  },
  {
    title: "Yangiliklar",
    key: "list-news-page",
    get: GetAllNews,
    icon: Newspaper,
    color: "cyan",
    path: "/list-news-page",
  },
];
const actions = [
  {
    title: "Yangilik qo‘shish",
    detail: "Universitet hayotidan yangi xabar",
    path: "/create-news-page",
    icon: Newspaper,
    color: "teal",
  },
  {
    title: "Fakultet qo‘shish",
    detail: "Universitet tuzilmasini to‘ldiring",
    path: "/create-faculty",
    icon: GraduationCap,
    color: "orange",
  },
  {
    title: "Sahifa yaratish",
    detail: "Sayt uchun yangi ma’lumot",
    path: "/create-category-page",
    icon: Files,
    color: "purple",
  },
];

function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const offset = (month.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const move = (amount) =>
    setMonth(
      (value) => new Date(value.getFullYear(), value.getMonth() + amount, 1),
    );
  return (
    <section className="panel calendar-panel">
      <div className="panel-heading">
        <h2>Kalendar</h2>
        <CalendarDays size={19} />
      </div>
      <div className="calendar-body">
        <div className="calendar-controls">
          <button
            className="icon-button"
            aria-label="Oldingi oy"
            onClick={() => move(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <strong aria-live="polite">{formatMonth(month)}</strong>
          <button
            className="icon-button"
            aria-label="Keyingi oy"
            onClick={() => move(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="calendar-grid">
          {["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"].map((day) => (
            <span className="weekday" key={day}>
              {day}
            </span>
          ))}
          {Array.from({ length: offset }, (_, i) => (
            <span key={`empty-${i}`} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const date = i + 1;
            const active =
              date === today.getDate() &&
              month.getMonth() === today.getMonth() &&
              month.getFullYear() === today.getFullYear();
            return (
              <span
                key={date}
                className={active ? "calendar-today" : ""}
                aria-current={active ? "date" : undefined}
              >
                {date}
              </span>
            );
          })}
        </div>
        <button
          className="calendar-reset"
          onClick={() =>
            setMonth(new Date(today.getFullYear(), today.getMonth(), 1))
          }
        >
          Bugungi kunga qaytish
        </button>
      </div>
    </section>
  );
}

export default function Dashboard() {
  const queries = useQueries({
    queries: metrics.map((metric) => ({
      queryKey: [metric.key],
      queryFn: metric.get,
      retry: 1,
    })),
  });
  const count = (index) =>
    Array.isArray(queries[index].data) ? queries[index].data.length : 0;
  const ready = queries.every((query) => query.isSuccess);
  const total = queries.reduce((sum, _, i) => sum + count(i), 0);
  const news = queries[5];
  const failed = queries.some((query) => query.isError);
  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <h1>Bosh sahifa</h1>
          <p>Xush kelibsiz! Universitet saytidagi ma’lumotlarni boshqaring.</p>
        </div>
        <span className="date-chip">
          <CalendarDays size={17} />
          {formatDate(new Date())}
        </span>
      </div>
      {failed && (
        <div className="data-notice" role="status">
          <span>Ayrim ma’lumotlarni yuklab bo‘lmadi.</span>
          <button
            onClick={() =>
              queries.forEach((query) => {
                if (query.isError) query.refetch();
              })
            }
          >
            <RefreshCw size={15} />
            Qayta urinish
          </button>
        </div>
      )}
      <div className="dashboard-top">
        <div className="stats-grid">
          {metrics.map((metric, i) => (
            <Link
              to={metric.path}
              className={`stat-card tone-${metric.color}`}
              key={metric.key}
            >
              <div className="stat-heading">
                <span className="stat-icon">
                  <metric.icon size={22} />
                </span>
                <span>{metric.title}</span>
                <ArrowUpRight className="stat-arrow" size={17} />
              </div>
              <strong className="stat-value">
                {queries[i].isPending
                  ? "…"
                  : queries[i].isError
                    ? "—"
                    : count(i).toLocaleString("uz-UZ")}
              </strong>
              <span className="stat-caption">
                {queries[i].isPending
                  ? "Yuklanmoqda"
                  : queries[i].isError
                    ? "Ma’lumot mavjud emas"
                    : "Jami ma’lumotlar"}
                <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
        <section className="panel overview-panel">
          <div className="panel-heading">
            <h2>Umumiy ko‘rsatkichlar</h2>
            <span className="subtle-badge">Jami</span>
          </div>
          <div className="overview-content">
            <div className="overview-total">
              <strong>{ready ? total.toLocaleString("uz-UZ") : "—"}</strong>
              <span>ta ma’lumot</span>
            </div>
            <div className="distribution-bar" aria-hidden="true">
              {metrics.map((metric, i) => (
                <span
                  key={metric.key}
                  className={`tone-${metric.color}`}
                  style={{
                    flex: ready && total ? count(i) : 1,
                    opacity: ready && total ? 1 : 0.2,
                  }}
                />
              ))}
            </div>
            <div className="overview-legend">
              {metrics.map((metric, i) => (
                <div key={metric.key}>
                  <span className={`legend-dot tone-${metric.color}`} />
                  <span>{metric.title}</span>
                  <strong>{queries[i].isSuccess ? count(i) : "—"}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="dashboard-bottom">
        <div className="dashboard-primary">
          <section className="welcome-banner">
            <div>
              <span className="eyebrow">NSUMT BOSHQARUV PANELI</span>
              <h2>Yangi xabar. Yangi imkoniyat.</h2>
              <p>
                Universitet yangiliklarini ulashing va saytni yangilab boring.
              </p>
              <Link to="/create-news-page" className="btn-primary">
                <Plus size={17} />
                Yangilik qo‘shish
              </Link>
            </div>
            <div className="welcome-art" aria-hidden="true">
              <div className="art-orbit" />
              <GraduationCap size={92} strokeWidth={1.2} />
              <span className="art-spark">✦</span>
              <span className="art-dot" />
            </div>
          </section>
          <section className="panel">
            <div className="panel-heading">
              <h2>So‘nggi yangiliklar</h2>
              <Link to="/list-news-page" className="text-link">
                Barchasi <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="news-list">
              {news.isPending ? (
                <div className="empty-state" role="status">
                  Yangiliklar yuklanmoqda…
                </div>
              ) : news.isError ? (
                <div className="empty-state">
                  Yangiliklarni yuklab bo‘lmadi.
                  <button className="text-link" onClick={() => news.refetch()}>
                    Qayta urinish
                  </button>
                </div>
              ) : !news.data?.length ? (
                <div className="empty-state">
                  <span className="empty-icon">
                    <Newspaper size={27} />
                  </span>
                  <strong>Hozircha yangiliklar yo‘q</strong>
                  <p>Birinchi yangilikni qo‘shishdan boshlang.</p>
                  <Link className="text-link" to="/create-news-page">
                    <Plus size={16} />
                    Yangilik qo‘shish
                  </Link>
                </div>
              ) : (
                news.data.slice(0, 4).map((item, i) => (
                  <Link
                    key={item.news_id}
                    to={`/update-news-page/${item.news_id}`}
                    className="news-row"
                  >
                    <span className={`news-icon tone-${metrics[i % 6].color}`}>
                      <Newspaper size={21} />
                    </span>
                    <span className="news-copy">
                      <strong>
                        {item.title_uz ||
                          item.title_ru ||
                          item.title_en ||
                          "Sarlavhasiz yangilik"}
                      </strong>
                      <small>
                        {item.news_time &&
                        !Number.isNaN(Date.parse(item.news_time))
                          ? formatDate(new Date(item.news_time))
                          : "Universitet yangiliklari"}
                      </small>
                    </span>
                    <ArrowUpRight size={18} />
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>
        <div className="dashboard-secondary">
          <section className="panel">
            <div className="panel-heading">
              <h2>Tezkor amallar</h2>
              <span className="subtle-badge">
                <Plus size={15} />
              </span>
            </div>
            <div className="quick-actions">
              {actions.map((action) => (
                <Link to={action.path} key={action.path}>
                  <span className={`action-icon tone-${action.color}`}>
                    <action.icon size={21} />
                  </span>
                  <span>
                    <strong>{action.title}</strong>
                    <small>{action.detail}</small>
                  </span>
                  <ChevronRight size={17} />
                </Link>
              ))}
            </div>
          </section>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
