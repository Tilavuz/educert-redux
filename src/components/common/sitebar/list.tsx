import { BookUser, GraduationCap, House, Table, User, BriefcaseBusiness } from "lucide-react";

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
    route: "/work-table",
    title: "Work Table",
    icon: <BriefcaseBusiness />,
  },
];