interface DataState {
  answer: string;
}

const initialState: DataState = {
  answer: ''
};

interface Action {
  type: string;
  payload: string;
}

const dataReducer = (state: DataState = initialState, action: Action): DataState => {
  console.log(action)
  switch (action.type) {
    case 'ANSWER':
      return { ...state, answer: action.payload };
    default:
      return state;
  }
};

export default dataReducer;
