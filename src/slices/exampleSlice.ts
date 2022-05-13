import { createSlice } from '@reduxjs/toolkit';

interface exampleState {
  value: number;
}

const initialState: exampleState = {
  value: 0,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

export const { increment } = exampleSlice.actions;

export default exampleSlice.reducer;
