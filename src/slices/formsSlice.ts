import { createSlice } from '@reduxjs/toolkit';

interface formsState {
  isNewBoardFormOpen: boolean;
}

const initialState: formsState = {
  isNewBoardFormOpen: false,
};

export const formsSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    toggleNewBoardForm: (state) => {
      state.isNewBoardFormOpen = !state.isNewBoardFormOpen;
    },
  },
});

export const { toggleNewBoardForm } = formsSlice.actions;

export default formsSlice.reducer;
