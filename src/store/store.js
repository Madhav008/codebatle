import { configureStore } from '@reduxjs/toolkit'

import dataReducer from './dataSlice';
import codeReducer from './codeSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    roomdata: dataReducer,
    code: codeReducer,
    user:userReducer,
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })) 
})