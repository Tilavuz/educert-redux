import { TeacherTaskInterface } from "@/interfaces/teacher-task-interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TeacherTaskState {
    loading: boolean,
    tasks: TeacherTaskInterface[] | null
}

const initialState: TeacherTaskState = {
    loading: false,
    tasks: null
}



const teacherTaskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getTasks: (state, action: PayloadAction<TeacherTaskInterface[]>) => {
            state.tasks = action.payload,
            state.loading = false
        },
        createTask: (state, action: PayloadAction<TeacherTaskInterface>) => {
            if(state.tasks) {
                state.tasks = [action.payload, ...state.tasks]
            }else {
                state.tasks = [action.payload]
            }
        },
        deleteTasks: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks && state.tasks?.filter(task => task._id !== action.payload)
        }
    }
})



export const { getTasks, deleteTasks, createTask } = teacherTaskSlice.actions
export default teacherTaskSlice.reducer