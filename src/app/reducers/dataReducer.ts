import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DataState {
  answerPrompt: string;
  correctPrompt: string;
  correctImage: string;
  qNumber: number;
}

const initialState: DataState = {
  answerPrompt: '',
  correctPrompt: '',
  correctImage: '',
  qNumber: 1,
};

export const dataSlice = createSlice({
  name: 'dataSlicer',
  initialState,
  reducers: {
    setAnswerData: (state, action: PayloadAction<string>) => {
      state.answerPrompt = action.payload
    },
    initAnswerData: (state) => {
      state.answerPrompt = ''
    },
    setCorrectData: (state, action: PayloadAction<{ prompt: string; img: string }>) => {
      state.correctPrompt = action.payload.prompt
      state.correctImage = action.payload.img
    },
    incrementQNum: (state) => {
      state.qNumber += 1
    },
    initQNum: (state) => {
      state.qNumber = 1
    }
  }
})

export const { setAnswerData } = dataSlice.actions;
export const { initAnswerData } = dataSlice.actions;
export const { setCorrectData } = dataSlice.actions;
export const { incrementQNum } = dataSlice.actions;
export const { initQNum } = dataSlice.actions;
export default dataSlice.reducer;