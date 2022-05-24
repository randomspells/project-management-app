import { createSlice } from '@reduxjs/toolkit';
import { StorageEnum } from '../enums';
import {
  saveItemToStorage,
  getItemFromStorage,
  clearStorage,
} from '../utils/index';

interface AuthInterface {
  isAuthenticated: boolean;
  login: string;
  token: string;
}

interface AuthState {
  currentUser: AuthInterface | null;
  currentId: string | null;
}

const initialState: AuthState = {
  currentUser: getItemFromStorage(StorageEnum.User) as AuthInterface,
  currentId: getItemFromStorage(StorageEnum.UserId) as string,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const userData = { ...action.payload, isAuthenticated: true };
      state.currentUser = userData;
      saveItemToStorage(StorageEnum.User, userData);
    },
    logOut: (state) => {
      state.currentUser = null;
      state.currentId = null;
      clearStorage();
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.currentId = action.payload.userId;
      saveItemToStorage(StorageEnum.UserId, userId);
    },
  },
});

export const { logIn, logOut, setUserId } = authSlice.actions;

export default authSlice.reducer;
