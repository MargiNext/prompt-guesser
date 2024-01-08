import { createStore } from 'redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer'

// const store = createStore(dataReducer)

// export default store

export default configureStore({
  reducer: dataReducer,
});