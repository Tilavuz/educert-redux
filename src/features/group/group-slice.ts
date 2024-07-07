import { GroupInterface } from "@/interfaces/filial-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface GroupState {
    loading: boolean,
    error: string | null,
    groups: GroupInterface
}
