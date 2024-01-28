import { createStore } from 'redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer'

// const store = createStore(dataReducer)

// export default store

export const store = configureStore({
  reducer: {
    answerData: dataReducer,
    correctData: dataReducer,
    qNumData: dataReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch