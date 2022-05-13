import { createSlice } from '@reduxjs/toolkit';

interface formsState {
  isNewBoardFormOpen: boolean;
  isNewTaskListFormOpen: boolean;
  isEditTaskFormOpen: boolean;
}

const initialState: formsState = {
  isNewBoardFormOpen: false,
  isNewTaskListFormOpen: false,
  isEditTaskFormOpen: false,
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    toggleNewBoardForm: (state) => {
      state.isNewBoardFormOpen = !state.isNewBoardFormOpen;
    },
    toggleNewTaskListForm: (state) => {
      state.isNewTaskListFormOpen = !state.isNewTaskListFormOpen;
    },
    toggleEditTaskForm: (state) => {
      state.isEditTaskFormOpen = !state.isEditTaskFormOpen;
    },
  },
});

export const { toggleNewBoardForm, toggleNewTaskListForm, toggleEditTaskForm } = formsSlice.actions;

export default formsSlice.reducer;
