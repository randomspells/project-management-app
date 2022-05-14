import { createSlice } from '@reduxjs/toolkit';

interface formsState {
  isNewBoardFormOpen: boolean;
  isNewTaskListFormOpen: boolean;
  isNewTaskFormOpen: boolean;
  isEditTaskFormOpen: boolean;
}

const initialState: formsState = {
  isNewBoardFormOpen: false,
  isNewTaskListFormOpen: false,
  isNewTaskFormOpen: true,
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
    toggleNewTaskForm: (state) => {
      state.isNewTaskFormOpen = !state.isNewTaskFormOpen;
    },
    toggleEditTaskForm: (state) => {
      state.isEditTaskFormOpen = !state.isEditTaskFormOpen;
    },
  },
});

export const { toggleNewBoardForm, toggleNewTaskListForm, toggleNewTaskForm, toggleEditTaskForm } = formsSlice.actions;

export default formsSlice.reducer;
