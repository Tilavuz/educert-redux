import { BookUser, File, GraduationCap, House, NotebookText, Rocket, Table, UserRound } from "lucide-react";

export const list = [
    {
        route: '/',
        title: "Dashboard",
        icon: <House />
    },
    {
        route: '/tables',
        title: "Tables",
        icon: <Table />
    },
    {
        route: '/teachers',
        title: "Teachers",
        icon: <BookUser />
    },
    {
        route: '/students',
        title: "Students",
        icon: <GraduationCap />
    }
]