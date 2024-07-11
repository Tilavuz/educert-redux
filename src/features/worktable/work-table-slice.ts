import { WorkTableInterface } from "@/interfaces/work-table-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface WorkTableState {
    loading: boolean,
    error: string | null,
    worktables: WorkTableInterface[] | null,
    worktablesTeacher: WorkTableInterface[] | null
}

const initialState: WorkTableState = {
  loading: false,
  error: null,
  worktables: null,
  worktablesTeacher: null
};

const worktableSlice = createSlice({
  name: "worktable",
  initialState,
  reducers: {
    addWorkTable: (state, action: PayloadAction<WorkTableInterface>) => {
      if (state.worktables) {
        state.worktables.push(action.payload);
      } else {
        state.worktables = [action.payload];
      }
      state.loading = false;
    },
    changeWorkTable: (state, action: PayloadAction<WorkTableInterface>) => {
      if (state.worktables) {
        state.worktables = state.worktables.map((worktable) =>
          worktable._id === action.payload._id ? action.payload : worktable
        );
      }
      state.loading = false;
    },
    removeWorkTable: (state, action: PayloadAction<string>) => {
      if (state.worktables) {
        state.worktables = state.worktables.filter(
          (worktable) => worktable._id !== action.payload
        );
      }
      state.loading = false;
    },
    getWorkTables: (state, action: PayloadAction<WorkTableInterface[]>) => {
      state.worktables = action.payload;
    },
    getWorkTablesTeacher: (state, action: PayloadAction<WorkTableInterface[]>) => {
      state.worktablesTeacher = action.payload;
    },
    isWorkTablePending: (state) => {
      (state.loading = true), (state.error = null);
    },
    workTablefial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});


export const {
  addWorkTable,
  changeWorkTable,
  getWorkTables,
  removeWorkTable,
  isWorkTablePending,
  workTablefial,
  getWorkTablesTeacher,
} = worktableSlice.actions;

export default worktableSlice.reducer