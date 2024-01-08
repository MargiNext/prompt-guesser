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

console.log('Initialize')


export const dataSlice = createSlice({
  name: 'textData',
  initialState,
  reducers: {
    setAnswerData: (state, action: PayloadAction<string>) => {
    // answer: (state, action:Action) => {
      // state.answer = 'hogehoge'
      state.text = action.payload
    }
  }
})

export const { setAnswerData } = dataSlice.actions
export default dataSlice.reducer