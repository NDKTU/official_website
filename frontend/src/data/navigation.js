import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  Layers3,
  Files,
  FileText,
  Newspaper,
  BookOpen,
} from "lucide-react";

export const navigation = [
  { label: "Bosh sahifa", path: "/", icon: LayoutDashboard, group: "ASOSIY" },
  {
    label: "Fakultetlar",
    path: "/list-faculty",
    icon: GraduationCap,
    group: "UNIVERSITET",
    match: "faculty",
  },
  {
    label: "Kafedralar",
    path: "/list-department",
    icon: Building2,
    match: "department",
  },
  {
    label: "Kategoriyalar",
    path: "/list-category",
    icon: Layers3,
    match: "category",
  },
  {
    label: "Fakultet sahifalari",
    path: "/list-faculty-page",
    icon: BookOpen,
    group: "KONTENT",
    match: "faculty-page",
  },
  {
    label: "Kafedra sahifalari",
    path: "/list-department-page",
    icon: Files,
    match: "department-page",
  },
  {
    label: "Kategoriya sahifalari",
    path: "/list-category-page",
    icon: FileText,
    match: "category-page",
  },
  {
    label: "Yangiliklar",
    path: "/list-news-page",
    icon: Newspaper,
    match: "news-page",
  },
];

export function isNavigationActive(item, pathname) {
  if (item.path === "/") return pathname === "/";
  return new RegExp(`^/(list|create|update)-${item.match}(/|$)`).test(pathname);
}
