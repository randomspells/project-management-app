import { createSlice } from '@reduxjs/toolkit';

interface ColumnState {
  currentId: string | null;
}

const initialState: ColumnState = {
  currentId: null,
};

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setCurrentColumnId: (state, action) => {
      state.currentId = action.payload;
    },
  },
});

export const { setCurrentColumnId } = columnSlice.actions;

export default columnSlice.reducer;
