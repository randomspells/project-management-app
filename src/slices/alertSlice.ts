import { createSlice } from '@reduxjs/toolkit';
import { ApiErrorType } from '../interfaces';

interface AlertState {
  error: ApiErrorType;
  isSuccess: boolean;
  isOpen: boolean;
}

const initialState: AlertState = {
  error: undefined,
  isSuccess: false,
  isOpen: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertResult: (state, action) => {
      state.isSuccess = action.payload.isSuccess;
      state.error = action.payload.error;
    },
    toggleAlertIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setAlertResult, toggleAlertIsOpen } = alertSlice.actions;

export default alertSlice.reducer;
