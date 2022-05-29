import { createSlice } from '@reduxjs/toolkit';
import { ColumnInterface } from '../interfaces/index';

interface ColumnState {
  currentId: string | null;
  currentColumn: ColumnInterface | null;
}

const initialState: ColumnState = {
  currentId: null,
  currentColumn: null,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setCurrentColumnId: (state, action) => {
      state.currentId = action.payload;
    },
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload.column;
    },
  },
});

export const { setCurrentColumnId, setCurrentColumn } = columnSlice.actions;

export default columnSlice.reducer;
