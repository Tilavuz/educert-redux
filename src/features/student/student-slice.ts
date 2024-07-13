import { StudentInterface } from "@/interfaces/auth-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StudentState {
  loading: boolean;
  error: string | null;
  students: StudentInterface[] | null;
}

const initialState: StudentState = {
  loading: false,
  error: null,
  students: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<StudentInterface>) => {
      if (state.students) {
        state.students.push(action.payload);
      } else {
        state.students = [action.payload];
      }
      state.loading = false;
    },
    changeStudent: (state, action: PayloadAction<StudentInterface>) => {
      if (state.students) {
        state.students = state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        );
      }
      state.loading = false;
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      if (state.students) {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      }
      state.loading = false;
    },
    getStudents: (state, action: PayloadAction<StudentInterface[]>) => {
      state.students = action.payload;
    },
    getStudentsGroup: (state, action: PayloadAction<StudentInterface[]>) => {
      state.students = action.payload;
    },
    isStudentPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    studentfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addStudent,
  changeStudent,
  removeStudent,
  getStudents,
  isStudentPending,
  studentfial,
  getStudentsGroup,
} = studentSlice.actions;

export default studentSlice.reducer;
