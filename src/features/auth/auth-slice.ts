import { apiClient } from "@/api/api-client";
import { actionToken } from "@/helpers/action-token";
import { AuthInterface } from "@/interfaces/auth-interface";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface AuthState {
  isLogin: boolean;
  auth: AuthInterface | null;
  loading: boolean;
  error: string | null;
  status: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  auth: null,
  loading: false,
  error: null,
  status: null,
};

export const getUserData = createAsyncThunk<
  AuthInterface,
  void,
  { rejectValue: string }
>("user/getUser", async (_, thunkApi) => {
  try {
    const response = await apiClient.get("/auth");
    return response.data as AuthInterface;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    loginSuccess: (state, action: PayloadAction<AuthInterface>) => {
      (state.loading = false),
        (state.isLogin = true),
        (state.auth = action.payload);
    },
    loginFail: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
    logout: (state) => {
      (state.isLogin = false),
        (state.auth = null),
        actionToken.setToken("token", "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<AuthInterface>) => {
          state.status = "succeeded";
          state.auth = action.payload;
        }
      )
      .addCase(getUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  authSlice.actions;

export default authSlice.reducer;
