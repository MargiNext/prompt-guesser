const initialState = {
    count: 0,
    answer: ''
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENTS':
        return { ...state, count: state.count + 1 }
        case 'DECREMENT':
        return { ...state, count: state.count - 1 }
        case 'ANSWER':
        // return { ...state, answer: action.type }
        return { ...state, answer: action.payload }
        default:
        return state
    }
}

export default dataReducer