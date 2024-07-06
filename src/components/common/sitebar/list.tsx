import { BookUser, File, GraduationCap, House, Rocket, Table, UserRound } from "lucide-react";

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
    },
]


export const list2 = [
    {
        route: '/profile',
        title: "Profile",
        icon: <UserRound />
    },
    {
        route: '/sign-in',
        title: "Sign In",
        icon: <File />
    },
    {
        route: '/sign-up',
        title: "Sign Up",
        icon: <Rocket />
    }
]