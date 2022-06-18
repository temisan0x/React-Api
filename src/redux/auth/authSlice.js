import authService from './authService'

import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const userData = {
  email: "smithwills1989@gmail.com",
  password: "12345678"
}


// Login user
export const login = createAsyncThunk('auth/login', async (_, thunkAPI) => {
  
  
  try {
    
    const { data } =  await authService.login(userData)

    return data
    

  } catch (error) {

    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


// export const getUsers = 

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      // state.isError = false
      // state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const {
  reset
} = authSlice.actions

export default authSlice.reducer