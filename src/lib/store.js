import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth';
import getmyChat from './api/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import miscSlice from './reducers/misc';


export const store= configureStore({
    reducer: {
  auth: authSlice,
[getmyChat.reducerPath]: getmyChat.reducer,
misc:miscSlice,
    },
    middleware:(defaultMiddleware)=>[...defaultMiddleware(), getmyChat.middleware]
  });
  
  setupListeners(store.dispatch);