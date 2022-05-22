import { createSlice } from '@reduxjs/toolkit';
import { StorageEnum } from '../enums/index';
import { getItemFromStorage, saveItemToStorage } from '../utils/index';

import { BoardInterface } from '../interfaces';

interface BoardState {
  currentBoard: BoardInterface | null;
}

const initialState: BoardState = {
  currentBoard:
    (getItemFromStorage(StorageEnum.CurrentBoard) as BoardInterface) || null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
      saveItemToStorage(StorageEnum.CurrentBoard, action.payload);
    },
  },
});

export const { setCurrentBoard } = boardSlice.actions;

export default boardSlice.reducer;
