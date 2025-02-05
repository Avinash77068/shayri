import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/slice/slice'
import dataSlice from '../store/slice/DataSlice'

export default configureStore({
  reducer: {
    states: counterReducer,
    secondStates:dataSlice
  }
})