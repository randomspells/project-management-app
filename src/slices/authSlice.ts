import { createSlice } from '@reduxjs/toolkit';
import { StorageEnum } from '../enums';
import { saveItemToStorage, getItemFromStorage, clearStorage } from '../utils/index';

interface AuthInterface {
  isAuthenticated: boolean;
  login: string;
  user: string;
  token: string;
}

interface AuthState {
  currentUser: AuthInterface | null;
  currentId: string | null;
}

const initialState: AuthState = {
  currentUser: getItemFromStorage(StorageEnum.User) as AuthInterface,
  currentId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = { ...action.payload, isAuthenticated: true };
      state.currentUser = userData;
      saveItemToStorage(StorageEnum.User, userData);
    },
    logout: (state) => {
      state.currentUser = null;
      clearStorage();
    },
    setUserId: (state, action) => {
      state.currentId = action.payload.userId;
    }
  },
});

export const { login, logout, setUserId } = authSlice.actions;

export default authSlice.reducer;
