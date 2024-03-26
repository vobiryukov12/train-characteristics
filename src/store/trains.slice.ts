import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ITrain, IStateTrains } from '@/models'

export const fetchTrains = createAsyncThunk(
  'trains/fetch',
  async (url: string, thunkAPI) => {
    const response = await fetch(url, {
      signal: thunkAPI.signal,
    })

    const data: ITrain[] = await response.json()

    const trainsData = data.map((train, trainIndex) => ({
      ...train,
      characteristics: train.characteristics.map((item, i) => ({
        ...item,
        id: i,
      })),
      id: trainIndex,
    }))

    return trainsData
  }
)

const initialState: IStateTrains = {
  trains: [],
  loading: true,
  error: '',
  filter: -1,
}

const trainsSlice = createSlice({
  name: '@trains',
  initialState,
  reducers: {
    chooseTrain: (state, action: PayloadAction<number>) => {
      state.filter = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTrains.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchTrains.fulfilled, (state, action) => {
      state.loading = false
      state.trains = action.payload
    })
    builder.addCase(fetchTrains.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        state.error = ''
      } else {
        const error = new Error(
          'Извините, в данный момент сервис не работает, попробуйте позже!'
        )
        state.error = error.message
        state.loading = false
      }
    })
  },
})

export const { chooseTrain } = trainsSlice.actions
export default trainsSlice.reducer
