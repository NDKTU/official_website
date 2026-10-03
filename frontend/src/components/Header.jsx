import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  Search,
  ChevronDown,
  LogOut,
  UserRound,
  X,
  ArrowUpRight,
} from "lucide-react";
import { navigation, isNavigationActive } from "../data/navigation";

export default function Header({ onToggle, expanded, onLogout }) {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { pathname } = useLocation();
  const current = navigation.find((item) => isNavigationActive(item, pathname));
  useEffect(() => {
    function close(event) {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="icon-button menu-toggle"
          onClick={onToggle}
          aria-label="Menyuni ochish yoki yopish"
          aria-expanded={expanded}
          aria-controls="main-navigation"
        >
          <Menu size={23} />
        </button>
        <div
          className="header-search"
          onKeyDown={(e) => {
            if (e.key === "Escape") setSearch("");
          }}
        >
          <Search size={19} />
          <input
            aria-label="Bo‘limlarni qidirish"
            placeholder="Bo‘limlarni qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              className="search-clear"
              aria-label="Qidiruvni tozalash"
              onClick={() => setSearch("")}
            >
              <X size={16} />
            </button>
          )}
          {search.trim() && (
            <div className="search-results">
              {navigation
                .filter((item) =>
                  item.label
                    .toLocaleLowerCase()
                    .includes(search.trim().toLocaleLowerCase()),
                )
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSearch("")}
                  >
                    <item.icon size={18} />
                    {item.label}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              {!navigation.some((item) =>
                item.label
                  .toLocaleLowerCase()
                  .includes(search.trim().toLocaleLowerCase()),
              ) && <p>Bo‘lim topilmadi</p>}
            </div>
          )}
        </div>
        <span className="mobile-page-name">
          {current?.label || "Boshqaruv paneli"}
        </span>
      </div>
      <div className="header-right">
        <span className="language-label">
          <span>UZ</span> O‘zbekcha
        </span>
        <span className="header-divider" />
        <div
          className="profile-menu"
          ref={profileRef}
          onKeyDown={(e) => {
            if (e.key === "Escape") setProfileOpen(false);
          }}
        >
          <button
            className="profile-button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-expanded={profileOpen}
            aria-controls="account-menu"
          >
            <span className="avatar">
              <UserRound size={22} />
            </span>
            <span className="profile-label">
              <strong>Administrator</strong>
              <small>NSUMT</small>
            </span>
            <ChevronDown size={16} />
          </button>
          {profileOpen && (
            <div id="account-menu" className="profile-dropdown">
              <p>Hisob boshqaruvi</p>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  onLogout();
                }}
              >
                <LogOut size={17} />
                Tizimdan chiqish
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
