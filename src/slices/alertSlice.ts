import { createSlice } from '@reduxjs/toolkit';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { ApiErrorType } from '../interfaces';

interface AlertState {
  status: QueryStatus;
  error: ApiErrorType;
  isOpen: boolean;
}

const initialState: AlertState = {
  status: QueryStatus.uninitialized,
  error: undefined,
  isOpen: false,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertStatus: (state, action) => {
      state.status = action.payload.status;
    },
    setAlertError: (state, action) => {
      state.error = action.payload.error;
    },
    toggleAlertIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setAlertStatus, setAlertError, toggleAlertIsOpen } = alertSlice.actions;

export default alertSlice.reducer;
