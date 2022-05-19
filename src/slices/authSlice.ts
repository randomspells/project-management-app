import { createSlice } from '@reduxjs/toolkit';

interface AuthInterface {
  isAuthenticated: boolean;
  login: string;
  user: string;
  token: string;
}

interface AuthState {
  currentUser: AuthInterface | null;
}

const initialState: AuthState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = {...action.payload, isAuthenticated: true};
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
