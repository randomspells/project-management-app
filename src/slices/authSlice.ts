import { createSlice } from '@reduxjs/toolkit';
import { saveItemToStorage, getItemFromStorage, clearStorage } from '../utils/index';

interface AuthInterface {
  isAuthenticated: boolean;
  login: string;
  user: string;
  token: string;
}

interface AuthState {
  currentUser: AuthInterface | null;
  token: string;
}

const initialState: AuthState = {
  currentUser: getItemFromStorage('user') as AuthInterface,
  token: getItemFromStorage('token') as string,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = { ...action.payload, isAuthenticated: true };
      saveItemToStorage('token', action.payload.token);
      saveItemToStorage('user', action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      clearStorage();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
