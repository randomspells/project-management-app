import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  isNewBoardFormOpen: boolean;
  isNewTaskListFormOpen: boolean;
  isNewTaskFormOpen: boolean;
  isEditTaskFormOpen: boolean;
}

const initialState: FormState = {
  isNewBoardFormOpen: false,
  isNewTaskListFormOpen: false,
  isNewTaskFormOpen: false,
  isEditTaskFormOpen: false,
};

export const formSlice = createSlice({
  name: 'form',
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

export const { toggleNewBoardForm, toggleNewTaskListForm, toggleNewTaskForm, toggleEditTaskForm } = formSlice.actions;

export default formSlice.reducer;
