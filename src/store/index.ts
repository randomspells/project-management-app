import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../slices/formSlice';
import taskReducer from '../slices/taskSlice';
import boardReducer from '../slices/boardSlice';
import columnReducer from '../slices/columnSlice';
import authReducer from '../slices/authSlice';
import alertReducer from '../slices/alertSlice';
import baseApi from '../api/base.api';
import { authApi } from '../api/auth.api';
import { boardApi } from '../api/board.api';

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    form: formReducer,
    task: taskReducer,
    board: boardReducer,
    column: columnReducer,
    [boardApi.reducerPath]: boardApi.reducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
