import { SchduleInterface } from "@/interfaces/schdule-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SchduleState {
  loading: boolean;
  error: string | null;
  schdules: SchduleInterface[] | null;
}

const initialState: SchduleState = {
  loading: false,
  error: null,
  schdules: null,
};

const schduleSlice = createSlice({
  name: "schdule",
  initialState,
  reducers: {
    addSchdule: (state, action: PayloadAction<SchduleInterface>) => {
      if (state.schdules) {
        state.schdules.push(action.payload);
      } else {
        state.schdules = [action.payload];
      }
      state.loading = false;
    },
    changeSchdule: (state, action: PayloadAction<SchduleInterface>) => {
      if (state.schdules) {
        state.schdules = state.schdules.map((schdule) =>
          schdule._id === action.payload._id ? action.payload : schdule
        );
      }
      state.loading = false;
    },
    removeSchdule: (state, action: PayloadAction<string>) => {
      if (state.schdules) {
        state.schdules = state.schdules.filter((schdule) => schdule._id !== action.payload);
      }
      state.loading = false;
    },
    getSchdules: (state, action: PayloadAction<SchduleInterface[]>) => {
      state.schdules = action.payload;
    },
    isSchdulePending: (state) => {
      (state.loading = true), (state.error = null);
    },
    schdulefial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addSchdule,
  changeSchdule,
  removeSchdule,
  isSchdulePending,
  schdulefial,
  getSchdules,
} = schduleSlice.actions;
export default schduleSlice.reducer;
