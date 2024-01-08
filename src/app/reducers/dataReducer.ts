import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DataState {
  answer: string;
}

const initialState: DataState = {
  answer: 'hoge'
};

interface Action {
  type: string;
  payload: string;
}

// const dataReducer = (state: DataState = initialState, action: Action): DataState => {
//   console.log(action)
//   switch (action.type) {
//     case 'ANSWER':
//       return { ...state, answer: action.payload };
//     default:
//       return state;
//   }
// };

// export default dataReducer;


export const dataSlice = createSlice({
  name: 'dataSlice',
  initialState,
  reducers: {
    answerPrompt: (state, action: PayloadAction<string>) => {
    // answer: (state, action:Action) => {
      // state.answer = 'hogehoge'
      state.answer = action.payload
    }
  }
})

export const { answerPrompt } = dataSlice.actions
export default dataSlice.reducer