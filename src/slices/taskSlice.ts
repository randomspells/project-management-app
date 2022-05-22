import { createSlice } from '@reduxjs/toolkit';

interface CurrentTaskInterface {
  id: string;
  title: string;
  done: boolean;
  description: string;
}

interface TaskState {
  currentTask: CurrentTaskInterface | null;
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
