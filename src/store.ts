import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import taskReducer from './slices/taskSlice';
import boardReducer from './slices/boardSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    task: taskReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
