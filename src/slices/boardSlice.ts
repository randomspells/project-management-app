import { createSlice } from '@reduxjs/toolkit';

interface CurrentBoardInterface {
  id: string;
  title: string;
}

interface BoardState {
  currentBoard: CurrentBoardInterface | null;
}

const initialState: BoardState = {
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
