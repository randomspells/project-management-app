import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import taskReducer from './slices/taskSlice';
import boardReducer from './slices/boardSlice';
// import userReducer from './slices/userSlice';
import { authApi } from './api/auth.api';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    task: taskReducer,
    board: boardReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
