import { createSlice } from '@reduxjs/toolkit';

interface authInterface {
  IsAuthenticated: boolean;
  login: string;
  user: string;
  token: string;
}

interface authState {
  currentUser: authInterface | null;
}

const initialState: authState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = {...action.payload, IsAuthenticated: true};
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
