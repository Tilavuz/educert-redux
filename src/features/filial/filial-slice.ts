import { FilialInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilialState {
  filials: FilialInterface[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: FilialState = {
  filials: null,
  loading: false,
  error: null,
};

const filialSlice = createSlice({
  name: "filial",
  initialState,
  reducers: {
    addFilial: (state, action: PayloadAction<FilialInterface>) => {
      if (state.filials) {
        state.filials.push(action.payload);
      } else {
        state.filials = [action.payload];
      }
      state.loading = false;
    },
    changeFilial: (state, action: PayloadAction<FilialInterface>) => {
      if (state.filials) {
        state.filials = state.filials.map((filial) =>
          filial._id === action.payload._id ? action.payload : filial
        );
      }
      state.loading = false;
    },
    removeFilial: (state, action: PayloadAction<string>) => {
      if (state.filials) {
        state.filials = state.filials.filter(
          (filial) => filial._id !== action.payload
        );
      }
      state.loading = false;
    },
    getFilials: (state, action: PayloadAction<FilialInterface[]>) => {
      state.filials = action.payload;
    },
    isFilialPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    Filialfial: (state, action: PayloadAction<string>) => {
      state.error = action.payload,
      state.loading = false
    },
  },
});

export const { addFilial, changeFilial, getFilials, isFilialPending, Filialfial, removeFilial } =
  filialSlice.actions;

export default filialSlice.reducer;
