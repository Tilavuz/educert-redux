import { actionToken } from "@/helpers/action-token";
import { AuthInterface } from "@/interfaces/auth-interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLogin: boolean;
  auth: AuthInterface | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  auth: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
        state.loading = true,
        state.error = null
    },
    loginSuccess: (state, action: PayloadAction<AuthInterface>) => {
        state.loading = false,
        state.isLogin = true,
        state.auth = action.payload
        
    },
    loginFail: (state, action: PayloadAction<string>) => {
        state.error = action.payload,
        state.loading = false
    },
    logout: (state) => {
        state.isLogin = false,
        state.auth = null,
        actionToken.setToken('token', '')
    }
}
});


export const { loginStart, loginSuccess, loginFail, logout } = authSlice.actions


export default authSlice.reducer