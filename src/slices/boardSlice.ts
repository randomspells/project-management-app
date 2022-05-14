import { createSlice } from '@reduxjs/toolkit';

interface currentBoardInterface {
  id: string;
  title: string;
}

interface boardState {
  currentBoard: currentBoardInterface | null;
}

const initialState: boardState = {
  currentBoard: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
  },
});

export const { setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
