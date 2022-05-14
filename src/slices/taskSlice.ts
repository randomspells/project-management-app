import { createSlice } from '@reduxjs/toolkit';

interface currentTaskInterface {
  id: string;
  title: string;
  done: boolean;
  description: string;
}

interface taskState {
  currentTask: currentTaskInterface | null;
}

const initialState: taskState = {
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
