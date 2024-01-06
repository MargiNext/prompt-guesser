import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/dataReducer'

const store = createStore(dataReducer)

export default store
