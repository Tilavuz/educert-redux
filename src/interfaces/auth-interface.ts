import { FilialInterface, GroupInterface } from "./filial-interface";

export interface AuthInterface {
  _id: string;
  phone: string;
  password?: string;
  role: "admin" | "user" | "accountant" | "operator";
}


export interface UserInterface  {
    _id?: string;
    auth?: AuthInterface;
    name: string;
    lastname: string;
    photo: string;
    filial: FilialInterface[] | null;
}

export interface TeacherInterface {
    _id: string;
    auth: AuthInterface;
    name: string;
    lastname: string;
    photo: File | string | null;
    about: string;
    grade: string;
    filial: FilialInterface[];
}

export interface StudentInterface {
    _id: string;
    auth?: AuthInterface;
    name: string;
    lastname: string;
    filial: FilialInterface | null;
    groups: GroupInterface[] | null;
    photo?: string
}