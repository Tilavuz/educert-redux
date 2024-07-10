import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import filialReducer from '@/features/filial/filial-slice'
import teacherReducer from '@/features/teacher/teacher-slice'
import subjectReducer from '@/features/subject/subject-slice'
import roomReducer from '@/features/room/room-slice'
import groupReducer from '@/features/group/group-slice'
import userReducer from '@/features/user/user-slice'
import studentReducer from "@/features/student/student-slice";
import timeReducer from "@/features/time/time-slice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filial: filialReducer,
        teacher: teacherReducer,
        subject: subjectReducer,
        room: roomReducer,
        group: groupReducer,
        user: userReducer,
        student: studentReducer,
        time: timeReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch