import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../store/slice/slice'
import dataSlice from '../store/slice/DataSlice'
import loader from '../store/slice/Loader'
import AllUserReducer from './AllUser/AllUser'
export default configureStore({
  reducer: {
    states: counterReducer,
    secondStates:dataSlice,
    thirdState:loader,
    allUser: AllUserReducer,
  }
})