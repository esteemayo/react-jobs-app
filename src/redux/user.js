import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as userAPI from 'services/userService';

const initialStateValue = {
  user: null,
  isFetching: false,
  showAlert: false,
};

const tokenKey = 'jwt';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (expiredToken < Date.now()) {
    localStorage.removeItem(tokenKey);
  } else {
    initialStateValue.user = decodedToken;
  }
}

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.registerUser(user);
      localStorage.setItem(tokenKey, data.token);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.loginUser(user);
      localStorage.setItem(tokenKey, data.token);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('user/logout', () => {
  return localStorage.removeItem(tokenKey);
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialStateValue,
  extraReducers: {
    [registerUserAsync.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.user = payload;
    },
    [registerUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
    },
    [loginUserAsync.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.user = payload;
    },
    [loginUserAsync.rejected]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
    },
    [logout.fulfilled]: (state) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = false;
    },
  },
});

export default userSlice.reducer;
