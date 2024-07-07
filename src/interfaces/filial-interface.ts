export interface FilialInterface {
    _id: string;
    title: string;
    address: string;
}

export interface RoomInterface {
    _id: string;
    filial: string;
    number: number
}

export interface SubjectInterface {
    _id: string;
    filial: FilialInterface | null;
    title: string;
    photo?: File | string | null;
}

export interface TimeInterface {
    _id: string;
    filial: string;
    start: string;
    end: string;
}

export interface GroupInterface {
    
}