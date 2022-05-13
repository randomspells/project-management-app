import { createSlice } from '@reduxjs/toolkit';

interface formsState {
  isNewBoardFormOpen: boolean;
  isNewTaskListFormOpen: boolean;
}

const initialState: formsState = {
  isNewBoardFormOpen: false,
  isNewTaskListFormOpen: false,
};

export const formsSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    toggleNewBoardForm: (state) => {
      state.isNewBoardFormOpen = !state.isNewBoardFormOpen;
    },
    toggleNewTaskListForm: (state) => {
      state.isNewTaskListFormOpen = !state.isNewTaskListFormOpen;
    },
  },
});

export const { toggleNewBoardForm, toggleNewTaskListForm } = formsSlice.actions;

export default formsSlice.reducer;
