import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/auth/auth-slice'
import filialReducer from '@/features/filial/filial-slice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filial: filialReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch