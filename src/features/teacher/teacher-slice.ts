import { TeacherInterface } from "@/interfaces/auth-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface teacherState {
  loading: boolean;
  teachers: TeacherInterface[] | null;
  error: string | null;
}

const initialState: teacherState = {
  loading: false,
  teachers: null,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    addTeacher: (state, action: PayloadAction<TeacherInterface>) => {
      if (state.teachers) {
        state.teachers.push(action.payload);
      } else {
        state.teachers = [action.payload];
      }
      state.loading = false;
    },
    changeTeacher: (state, action: PayloadAction<TeacherInterface>) => {
      if (state.teachers) {
        state.teachers = state.teachers.map((teacher) =>
          teacher._id === action.payload._id ? action.payload : teacher
        );
      }
      state.loading = false;
    },
    removeTeacher: (state, action: PayloadAction<string>) => {
        if(state.teachers) {
            state.teachers = state.teachers.filter(teacher => teacher._id !== action.payload)
        }
        state.loading = false
    },
    getTeachers: (state, action: PayloadAction<TeacherInterface[]>) => {
        state.teachers = action.payload
    },
    isTeacherPending: (state) => {
        state.loading = true,
        state.error = null
    },
    teacherFail: (state, action: PayloadAction<string>) => {
        state.error = action.payload,
        state.loading = false
    }
  },
});

export const {addTeacher, getTeachers, removeTeacher, isTeacherPending, teacherFail, changeTeacher} = teacherSlice.actions;

export default teacherSlice.reducer;
