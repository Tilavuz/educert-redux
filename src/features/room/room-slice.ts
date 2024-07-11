import { RoomInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




export interface RoomState {
    loading: boolean,
    error: string | null,
    rooms: RoomInterface[] | null,
    filialRooms: RoomInterface[] | null
}

const initialState: RoomState = {
    loading: false,
    error: null,
    rooms: null,
    filialRooms: null
}


const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<RoomInterface>) => {
      if (state.rooms) {
        state.rooms.push(action.payload);
      } else {
        state.rooms = [action.payload];
      }
      state.loading = false;
    },
    changeRoom: (state, action: PayloadAction<RoomInterface>) => {
      if (state.rooms) {
        state.rooms = state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        );
      }
      state.loading = false;
    },
    removeRoom: (state, action: PayloadAction<string>) => {
      if (state.rooms) {
        state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      }
      state.loading = false;
    },
    getRooms: (state, action: PayloadAction<RoomInterface[]>) => {
      state.rooms = action.payload;
    },
    getFilialRooms: (state, action: PayloadAction<RoomInterface[]>) => {
      state.filialRooms = action.payload;
    },
    isRoomPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    Roomfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});



export const {
  addRoom,
  changeRoom,
  removeRoom,
  isRoomPending,
  Roomfial,
  getRooms,
  getFilialRooms,
} = roomSlice.actions;
export default roomSlice.reducer