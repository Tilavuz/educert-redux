import { FilialInterface } from "./filial-interface";

export interface AuthInterface {
    _id: string;
    phone: string;
    password?: string;
    role: 'admin' | 'user' | 'student' | 'operator';
}


export interface UserInterface  {
    _id: string;
    auth: string;
    name: string;
    lastname: string;
    photo: string;
    filials: string[];
}

export interface TeacherInterface {
    _id: string;
    auth: string;
    name: string;
    lastname: string;
    photo: File | string | null;
    about: string;
    grade: string;
    filial: FilialInterface[];
}

export interface StudentInterface {
    _id: string;
    auth: string;
    name: string;
    lastname: string;
    filial: string;
    subjects: string[];
    groups: string[];
}