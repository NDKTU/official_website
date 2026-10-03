import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage.jsx";

import { logout } from "./Api/LoginApi.jsx";

import CreateFaculty from "./pages/Faculty/CreateFaculty.jsx";
import ListFaculty from "./pages/Faculty/ListFaculty.jsx";
import UpdateFaculty from "./pages/Faculty/UpdateFaculty.jsx";

import CreateCategory from "./pages/Category/CreateCategory.jsx";
import ListCategory from "./pages/Category/ListCategory.jsx";
import UpdateCategory from "./pages/Category/UpdateCategory.jsx";
import CreateDepartment from "./pages/Department/CreateDepartment.jsx";
import ListDepartment from "./pages/Department/ListDepartment.jsx";
import UpdateDepartment from "./pages/Department/UpdateDepartment.jsx";
import CreateCategoryPage from "./pages/CategoryPage/CreateCategoryPage.jsx";
import ListCategoryPage from "./pages/CategoryPage/ListCategoryPage.jsx";
import UpdateCategoryPage from "./pages/CategoryPage/UpdateCategoryPage.jsx";
import ListNewsPage from "./pages/NewsPage/ListNewsPage.jsx";
import CreateNews from "./pages/NewsPage/CreateNews.jsx";
import UpdateNews from "./pages/NewsPage/UpdateNews.jsx";
import CreateFacultyPage from "./pages/FacultyPage/CreateFacultyPage.jsx";
import ListFacultyPage from "./pages/FacultyPage/ListFacultyPage.jsx";
import UpdateFacultyPage from "./pages/FacultyPage/UpdateFacultyPage.jsx";
import CreateDepartmentPage from "./pages/DepartmentPage/CreateDepartmentPage.jsx";
import ListDepartmentPage from "./pages/DepartmentPage/ListDepartmentPage.jsx";
import UpdateDepartmentPage from "./pages/DepartmentPage/UpdateDepartmentPage.jsx";

function ProtectedRoute({ children }) {
  let token;
  try {
    token = JSON.parse(localStorage.getItem("token"));
  } catch {
    token = null;
  }
  const location = useLocation();
  if (!token?.access_token)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function App() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1023px)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      setIsMobile(media.matches);
      if (!media.matches) setMobileOpen(false);
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", close);
    };
  }, [mobileOpen]);
  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((value) => !value);
    else setIsSidebarOpen((value) => !value);
  };
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <div
      className={`app-shell ${isSidebarOpen ? "" : "is-collapsed"} ${isLoginPage ? "auth-shell" : ""}`}
    >
      {!isLoginPage && (
        <>
          <Sidebar
            isOpen={isSidebarOpen}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
          <Header
            onToggle={toggleSidebar}
            expanded={isMobile ? mobileOpen : isSidebarOpen}
            onLogout={handleLogout}
          />
        </>
      )}
      <main
        id="main-content"
        className={isLoginPage ? "auth-main" : "app-main"}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-faculty"
            element={
              <ProtectedRoute>
                <CreateFaculty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/list-faculty"
            element={
              <ProtectedRoute>
                <ListFaculty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-faculty/:facultyId"
            element={
              <ProtectedRoute>
                <UpdateFaculty />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-category"
            element={
              <ProtectedRoute>
                <CreateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-category"
            element={
              <ProtectedRoute>
                <ListCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-category/:categoryId"
            element={
              <ProtectedRoute>
                <UpdateCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-department"
            element={
              <ProtectedRoute>
                <CreateDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-department"
            element={
              <ProtectedRoute>
                <ListDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-department/:departmentId"
            element={
              <ProtectedRoute>
                <UpdateDepartment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-category-page"
            element={
              <ProtectedRoute>
                <CreateCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-category-page"
            element={
              <ProtectedRoute>
                <ListCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-category-page/:categoryPageId"
            element={
              <ProtectedRoute>
                <UpdateCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-news-page"
            element={
              <ProtectedRoute>
                <CreateNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-news-page"
            element={
              <ProtectedRoute>
                <ListNewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-news-page/:newsId"
            element={
              <ProtectedRoute>
                <UpdateNews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-faculty-page"
            element={
              <ProtectedRoute>
                <CreateFacultyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-faculty-page"
            element={
              <ProtectedRoute>
                <ListFacultyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-faculty-page/:facultyPageId"
            element={
              <ProtectedRoute>
                <UpdateFacultyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-department-page"
            element={
              <ProtectedRoute>
                <CreateDepartmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-department-page"
            element={
              <ProtectedRoute>
                <ListDepartmentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-department-page/:departmentPageId"
            element={
              <ProtectedRoute>
                <UpdateDepartmentPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        {!isLoginPage && (
          <footer className="app-footer">
            <span>
              © {new Date().getFullYear()} NSUMT. Barcha huquqlar himoyalangan.
            </span>
            <span>Universitet boshqaruv paneli</span>
          </footer>
        )}
        <Toaster
          toastOptions={{ style: { borderRadius: "12px", fontSize: "14px" } }}
        />
      </main>
    </div>
  );
}

export default App;
