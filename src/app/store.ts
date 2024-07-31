import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/auth-slice";
import filialReducer from "@/features/filial/filial-slice";
import teacherReducer from "@/features/teacher/teacher-slice";
import subjectReducer from "@/features/subject/subject-slice";
import roomReducer from "@/features/room/room-slice";
import groupReducer from "@/features/group/group-slice";
import userReducer from "@/features/user/user-slice";
import studentReducer from "@/features/student/student-slice";
import timeReducer from "@/features/time/time-slice";
import workTableReducer from "@/features/worktable/work-table-slice";
import menuReducer from "@/features/menu/menu-slice";
import schduleReducer from "@/features/schdule/schdule-slice";
import departmentReducer from "@/features/department/department-slice";
import departmentThemeReducer from "@/features/department-theme/department-theme-slice";

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
    time: timeReducer,
    worktable: workTableReducer,
    menu: menuReducer,
    schdule: schduleReducer,
    department: departmentReducer,
    theme: departmentThemeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
