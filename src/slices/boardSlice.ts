import { createSlice } from '@reduxjs/toolkit';
import { getItemFromStorage, saveItemToStorage } from '../utils/index';

import { BoardInterface } from '../interfaces';

interface BoardState {
  currentBoard: BoardInterface | null;
}

const initialState: BoardState = {
  currentBoard: (getItemFromStorage('currentBoard') as BoardInterface) || null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
      saveItemToStorage('currentBoard', action.payload);
    },
  },
});

export const { setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
