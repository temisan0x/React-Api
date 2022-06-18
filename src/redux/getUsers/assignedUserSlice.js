import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import assignedUserService from './userService';

// Get user from localStorage

const assigneduser = JSON.parse(localStorage.getItem('assigneduser'))

const initialState = {
  assigneduser: assigneduser ? assigneduser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const user = JSON.parse(localStorage.getItem('user'))

// get Assigned user
export const getUser = createAsyncThunk('auth/getAssigned', async (_, thunkAPI) => {

    try {
    const company_id = user.results.company_id
    const token = user.results.token
    return await assignedUserService.getAssignedUser(company_id, token)
  
  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// export const getUsers = 

export const assignedUserSlice = createSlice({
    name: "auth",
    initialState,
  
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUser.pending, (state) => {
            state.isLoading = true
        })

        .addCase(getUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.assignedUser = action.payload
        })

        .addCase(getUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.assignedUser = null
        })
      },
})

export const {
  reset
} = assignedUserSlice.actions

export default assignedUserSlice.reducer