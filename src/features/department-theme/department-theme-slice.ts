import { ThemeInterface } from "@/interfaces/theme-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DepartmentThemeState {
  themes: {theme: ThemeInterface, id: string}[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentThemeState = {
  themes: null,
  loading: false,
  error: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    addtheme: (
      state,
      action: PayloadAction<{ theme: ThemeInterface; id: string }>
    ) => {
      if (state.themes) {
        state.themes.push(action.payload);
      } else {
        state.themes = [action.payload];
      }
      state.loading = false;
    },
    getThemes: (state, action: PayloadAction<{theme: ThemeInterface[], id: string}>) => {
      const themes = action.payload.theme.map((theme) => ({ theme, id: action.payload.id }))
      if(state.themes) {
        state.themes = [...state.themes, ...themes];
      }else {
        state.themes = [...themes]
      }
    },
    changetheme: (
      state,
      action: PayloadAction<{ theme: ThemeInterface; id: string }>
    ) => {
      if (state.themes) {
        state.themes = state.themes.map((theme) =>
          theme.theme._id === action.payload.theme._id ? action.payload : theme
        );
      }
      state.loading = false;
    },
    removetheme: (state, action: PayloadAction<string>) => {
      if (state.themes) {
        state.themes = state.themes.filter(
          (theme) => theme.theme._id !== action.payload
        );
      }
      state.loading = false;
    },
    isthemePending: (state) => {
      (state.loading = true), (state.error = null);
    },
    themeFial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});

export const {
  addtheme,
  changetheme,
  isthemePending,
  themeFial,
  removetheme,
  getThemes
} = themeSlice.actions;

export default themeSlice.reducer;
