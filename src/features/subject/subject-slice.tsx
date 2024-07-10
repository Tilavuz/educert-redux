import { SubjectInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SubjectState {
  loading: boolean;
  error: string | null;
  subjects: SubjectInterface[] | null;
  filialSubjects: SubjectInterface[] | null
}

const initialState: SubjectState = {
  loading: false,
  error: null,
  subjects: null,
  filialSubjects: null
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<SubjectInterface>) => {
      if (state.subjects) {
        state.subjects.push(action.payload);
      } else {
        state.subjects = [action.payload];
      }
      state.loading = false;
    },
    changeSubject: (state, action: PayloadAction<SubjectInterface>) => {
      if (state.subjects) {
        state.subjects = state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        );
      }
      state.loading = false;
    },
    removeSubject: (state, action: PayloadAction<string>) => {
      if (state.subjects) {
        state.subjects = state.subjects.filter(
          (subject) => subject._id !== action.payload
        );
      }
      state.loading = false;
    },
    getSubjects: (state, action: PayloadAction<SubjectInterface[]>) => {
      state.subjects = action.payload;
    },
    getFilialSubjects: (state, action: PayloadAction<SubjectInterface[]>) => {
      state.filialSubjects = action.payload
    },
    isSubjectPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    subjectfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addSubject,
  changeSubject,
  removeSubject,
  getSubjects,
  isSubjectPending,
  subjectfial,
  getFilialSubjects,
} = subjectSlice.actions;

export default subjectSlice.reducer;
