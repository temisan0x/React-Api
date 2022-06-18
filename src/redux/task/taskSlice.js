import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";


const initialState = {
  task: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
        if(Array.isArray(action.payload)) {
            state.task = [...state.task, ...action.payload]
        } else {
            state.task = [...state.task, action.payload]
        }
    },

    deleteTask: (state, action) => {
        state.task = state.task.filter(item => item.id !== action.payload)
    },

    updateTask: (state, action) => {
        const taskIndex = (state.task.findIndex(item => item._id === action.payload._id))
        console.log("taskIndex is", taskIndex)
        state.task[taskIndex] = action.payload   
    },
  },

  
})

export const {
  addTask,
  deleteTask,
  updateTask,
} = taskSlice.actions

export default taskSlice.reducer