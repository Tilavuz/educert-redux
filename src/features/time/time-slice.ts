import { TimeInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeState {
  times: TimeInterface[] | null;
  loading: boolean;
  error: string | null;
  filialTimes: TimeInterface[] | null
}

const initialState: TimeState = {
  times: null,
  loading: false,
  error: null,
  filialTimes: null,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    addTime: (state, action: PayloadAction<TimeInterface>) => {
      if (state.times) {
        state.times.push(action.payload);
      } else {
        state.times = [action.payload];
      }
      state.loading = false;
    },
    changeTime: (state, action: PayloadAction<TimeInterface>) => {
      if (state.times) {
        state.times = state.times.map((time) =>
          time._id === action.payload._id ? action.payload : time
        );
      }
      state.loading = false;
    },
    removeTime: (state, action: PayloadAction<string>) => {
      if (state.times) {
        state.times = state.times.filter((time) => time._id !== action.payload);
      }
      state.loading = false;
    },
    getTimes: (state, action: PayloadAction<TimeInterface[]>) => {
      state.times = action.payload;
    },
    getFilialTimes: (state, action: PayloadAction<TimeInterface[]>) => {
      state.filialTimes = action.payload;
    },
    isTimePending: (state) => {
      (state.loading = true), (state.error = null);
    },
    timefial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addTime,
  changeTime,
  getTimes,
  isTimePending,
  timefial,
  removeTime,
  getFilialTimes,
} = timeSlice.actions;

export default timeSlice.reducer;
