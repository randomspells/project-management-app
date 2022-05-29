import { createSlice } from '@reduxjs/toolkit';

interface FormState {
  isNewBoardFormOpen: boolean;
  isNewColumnFormOpen: boolean;
  isNewTaskFormOpen: boolean;
  isEditTaskFormOpen: boolean;
}

const initialState: FormState = {
  isNewBoardFormOpen: false,
  isNewColumnFormOpen: false,
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
    toggleNewColumnForm: (state) => {
      state.isNewColumnFormOpen = !state.isNewColumnFormOpen;
    },
    toggleNewTaskForm: (state) => {
      state.isNewTaskFormOpen = !state.isNewTaskFormOpen;
    },
    toggleEditTaskForm: (state) => {
      state.isEditTaskFormOpen = !state.isEditTaskFormOpen;
    },
  },
});

export const {
  toggleNewBoardForm,
  toggleNewColumnForm,
  toggleNewTaskForm,
  toggleEditTaskForm,
} = formSlice.actions;

export default formSlice.reducer;
