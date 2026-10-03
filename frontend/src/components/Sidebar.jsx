import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronRight, X, GraduationCap } from "lucide-react";
import HemisLogo from "./HemisLogo";
import { navigation, isNavigationActive } from "../data/navigation";

export default function Sidebar({ isOpen, mobileOpen, onClose }) {
  const { pathname } = useLocation();
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Menyuni yopish"
          onClick={onClose}
        />
      )}
      <aside
        id="main-navigation"
        className={`sidebar ${isOpen ? "" : "sidebar-collapsed"} ${mobileOpen ? "sidebar-mobile-open" : ""}`}
      >
        <div className="sidebar-brand">
          <Link to="/" onClick={onClose} aria-label="NSUMT bosh sahifa">
            <HemisLogo />
          </Link>
          <button
            className="icon-button mobile-close"
            onClick={onClose}
            aria-label="Menyuni yopish"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Asosiy navigatsiya">
          {navigation.map((item) => (
            <div key={item.path}>
              {item.group && <p className="nav-section">{item.group}</p>}
              <Link
                to={item.path}
                title={item.label}
                onClick={onClose}
                aria-current={
                  isNavigationActive(item, pathname) ? "page" : undefined
                }
                className={`nav-item ${isNavigationActive(item, pathname) ? "active" : ""}`}
              >
                <item.icon size={21} strokeWidth={1.7} />
                <span>{item.label}</span>
                <ChevronRight className="nav-arrow" size={15} />
              </Link>
            </div>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="sidebar-note-icon">
            <GraduationCap size={25} />
          </span>
          <strong>Universitet yangiliklari</strong>
          <p>So‘nggi xabarlarni saytga joylang.</p>
          <Link to="/create-news-page" onClick={onClose}>
            Yangilik qo‘shish <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="sidebar-bottom">
          <span className="status-dot" />
          <span>NSUMT · Administrator</span>
        </div>
      </aside>
    </>
  );
}
