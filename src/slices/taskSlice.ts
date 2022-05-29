import { createSlice } from '@reduxjs/toolkit';
import { TaskInterface } from '../interfaces';

interface TaskState {
  currentTask: TaskInterface | null;
}

const initialState: TaskState = {
  currentTask: null,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
  },
});

export const { setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer;
