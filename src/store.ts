import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
