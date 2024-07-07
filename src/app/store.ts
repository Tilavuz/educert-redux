import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import filialReducer from '@/features/filial/filial-slice'
import teacherReducer from '@/features/teacher/teacher-slice'
import subjectReducer from '@/features/subject/subject-slice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filial: filialReducer,
        teacher: teacherReducer,
        subject: subjectReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch