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
      state.isOpen = true;
      state.isSuccess = action.payload.isSuccess;
      state.error = action.payload.error;
    },
    closeAlert: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setAlertResult, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
