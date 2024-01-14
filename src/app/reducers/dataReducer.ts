import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DataState {
  text: string;
}

const initialState: DataState = {
  text: 'hoge'
};

interface Action {
  type: string;
  payload: string;
}

export const dataSlice = createSlice({
  name: 'textData',
  initialState,
  reducers: {
    setAnswerData: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  }
})

export const { setAnswerData } = dataSlice.actions
export default dataSlice.reducer