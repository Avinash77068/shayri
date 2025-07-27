// store/index.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../store/slice/slice';
import dataSlice from '../store/slice/DataSlice';
import loader from '../store/slice/Loader';
import AllUser from './AllUser/AllUser';
import loginUser from '../store/slice/Login';

import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

// List of slices you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginUser', 'alldata'], //  only these will be persisted
};

const rootReducer = combineReducers({
  states: counterReducer,
  alldata: dataSlice,
  thirdState: loader,
  loginUser,
  allUser: AllUser,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
