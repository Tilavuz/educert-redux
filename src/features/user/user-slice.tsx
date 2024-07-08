import { UserInterface } from "@/interfaces/auth-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserState {
    loading: boolean,
    error: string | null,
    users: UserInterface[] | null
}

const initialState: UserState = {
    loading: false,
    error: null,
    users: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserInterface>) => {
          if (state.users) {
            state.users.push(action.payload);
          } else {
            state.users = [action.payload];
          }
          state.loading = false;
        },
        changeUser: (state, action: PayloadAction<UserInterface>) => {
          if (state.users) {
            state.users = state.users.map((user) =>
                user._id === action.payload._id ? action.payload : user
            );
          }
          state.loading = false;
        },
        removeUser: (state, action: PayloadAction<string>) => {
          if (state.users) {
            state.users = state.users.filter(
              (user) => user._id !== action.payload
            );
          }
          state.loading = false;
        },
        getUsers: (state, action: PayloadAction<UserInterface[]>) => {
          state.users = action.payload;
        },
        isUserPending: (state) => {
          (state.loading = true), (state.error = null);
        },
        userfial: (state, action: PayloadAction<string>) => {
          state.error = action.payload,
          state.loading = false
        },
      },
})


export const { userfial, isUserPending, getUsers, removeUser, changeUser, addUser } = userSlice.actions


export default userSlice.reducer