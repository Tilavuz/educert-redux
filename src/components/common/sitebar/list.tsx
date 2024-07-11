import { BookUser, GraduationCap, House, Table, User, NotebookPen } from "lucide-react";

export const list = [
  {
    route: "/",
    title: "Dashboard",
    icon: <House />,
  },
  {
    route: "/tables",
    title: "Tables",
    icon: <Table />,
  },
  {
    route: "/teachers",
    title: "Teachers",
    icon: <BookUser />,
  },
  {
    route: "/students",
    title: "Students",
    icon: <GraduationCap />,
  },
  {
    route: "/users",
    title: "Users",
    icon: <User />,
  },
  {
    route: "/class-schedule",
    title: "Class Schedule",
    icon: <NotebookPen />,
  },
];