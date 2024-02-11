import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  loggedIn: boolean;
}

const initState = {
  loggedIn: false
} as AuthState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = true;
    }
  }
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
