import { GroupInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GroupState {
  loading: boolean;
  error: string | null;
  groups: GroupInterface[] | null;
}

const initialState: GroupState = {
  loading: false,
  error: null,
  groups: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<GroupInterface>) => {
      if (state.groups) {
        state.groups.push(action.payload);
      } else {
        state.groups = [action.payload];
      }
      state.loading = false;
    },
    changeGroup: (state, action: PayloadAction<GroupInterface>) => {
      if (state.groups) {
        state.groups = state.groups.map((group) =>
            group._id === action.payload._id ? action.payload : group
        );
      }
      state.loading = false;
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      if (state.groups) {
        state.groups = state.groups.filter(
          (group) => group._id !== action.payload
        );
      }
      state.loading = false;
    },
    getGroups: (state, action: PayloadAction<GroupInterface[]>) => {
      state.groups = action.payload;
    },
    isGroupPending: (state) => {
      (state.loading = true), (state.error = null);
    },
    groupfial: (state, action: PayloadAction<string>) => {
      (state.error = action.payload), (state.loading = false);
    },
  },
});


export const { addGroup, groupfial, isGroupPending, getGroups, removeGroup, changeGroup  } = groupSlice.actions


export default groupSlice.reducer