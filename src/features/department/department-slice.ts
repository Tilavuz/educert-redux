import { DepartmentInterface } from "@/interfaces/department-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DepartmentState {
  departments: DepartmentInterface[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: null,
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    addDepartment: (state, action: PayloadAction<DepartmentInterface>) => {
      if (state.departments) {
        state.departments.push(action.payload);
      } else {
        state.departments = [action.payload];
      }
      state.loading = false;
    },
    changeDepartment: (state, action: PayloadAction<DepartmentInterface>) => {
      if (state.departments) {
        state.departments = state.departments.map((department) =>
          department._id === action.payload._id ? action.payload : department
        );
      }
      state.loading = false;
    },
    removeDepartment: (state, action: PayloadAction<string>) => {
      if (state.departments) {
        state.departments = state.departments.filter(
          (department) => department._id !== action.payload
        );
      }
      state.loading = false;
    },
    getDepartments: (state, action: PayloadAction<DepartmentInterface[]>) => {
      state.departments = action.payload;
    },
    isDepartmentPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    departmentFial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addDepartment,
  changeDepartment,
  getDepartments,
  isDepartmentPending,
  departmentFial,
  removeDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
