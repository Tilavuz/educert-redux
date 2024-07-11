import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
    menu: boolean
}


const initialState: MenuState = {
    menu: false
}

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        toggleMenu: (state) => {
            state.menu = !state.menu
        }
    }
})



export const { toggleMenu } = menuSlice.actions

export default menuSlice.reducer