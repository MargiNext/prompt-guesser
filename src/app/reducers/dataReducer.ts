import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DataState {
  answerPrompt: string;
  correctPrompt: string;
  correctImage: string;
}

const initialState: DataState = {
  answerPrompt: 'hoge',
  correctPrompt: 'huga',
  correctImage: 'hugahuga',
};

export const dataSlice = createSlice({
  name: 'textData',
  initialState,
  reducers: {
    setAnswerData: (state, action: PayloadAction<string>) => {
      state.answerPrompt = action.payload
    },
    setCorrectData: (state, action: PayloadAction<{ prompt: string; img: string }>) => {
      state.correctPrompt = action.payload.prompt
      state.correctImage = action.payload.img
    },
  }
})

export const { setAnswerData } = dataSlice.actions
export const { setCorrectData } = dataSlice.actions
export default dataSlice.reducer