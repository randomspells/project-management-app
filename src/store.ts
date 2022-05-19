import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import taskReducer from './slices/taskSlice';
import boardReducer from './slices/boardSlice';
import authReducer from './slices/authSlice';
import baseApi from './api/base.api';
import { authApi } from './api/auth.api';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    task: taskReducer,
    board: boardReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(baseApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
