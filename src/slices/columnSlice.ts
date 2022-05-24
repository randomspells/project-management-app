import { createSlice } from '@reduxjs/toolkit';

interface CurrentColumnInterface {
  id: string;
  title: string;
}

interface ColumnState {
  currentColumn: CurrentColumnInterface | null;
}

const initialState: ColumnState = {
  currentColumn: null,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setCurrentColumn: (state, action) => {
      state.currentColumn = action.payload;
    },
  },
});

export const { setCurrentColumn } = columnSlice.actions;

export default columnSlice.reducer;
