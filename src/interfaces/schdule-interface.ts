import { TeacherInterface } from "./auth-interface";
import { FilialInterface, GroupInterface, RoomInterface, SubjectInterface, TimeInterface } from "./filial-interface";

export interface SchduleInterface {
    _id: string,
    filial: FilialInterface | null,
    time: TimeInterface | null,
    teacher: TeacherInterface | null,
    room: RoomInterface | null,
    group: GroupInterface | null,
    subject: SubjectInterface | null
}