import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import weatherService from './weatherService'

const initialState = {
  location: {},
  current: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get weather data
export const getWeather = createAsyncThunk('weather/get', async (query, thunkAPI) => {
  try {
    return await weatherService.getWeather(query)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})


export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.location = action.payload.location
        state.current = action.payload.current
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = weatherSlice.actions
export default weatherSlice.reducer