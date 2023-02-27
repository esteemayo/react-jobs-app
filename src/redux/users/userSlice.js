import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as userAPI from 'services/userService';

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async ({ user, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.loginUser({ ...user });
      toast.success('Login successful');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/register',
  async ({ user, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.registerUser({ ...user });
      toast.success('Registration successful');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: null,
  isFetching: false,
  showAlert: false,
  error: '',
};

const tokenKey = 'jwt';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (expiredToken < Date.now()) {
    localStorage.removeItem(tokenKey);
  } else {
    initialState.user = decodedToken;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isFetching = false;
      state.showAlert = false;
      state.error = '';
    },
    setLogout: (state) => {
      localStorage.removeItem(tokenKey);
      state.user = null;
    },
  },
  extraReducers: {
    [loginUserAsync.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [loginUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      localStorage.setItem(tokenKey, payload.token);
      state.user = payload;
    },
    [loginUserAsync.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
      state.error = payload.message;
    },
    [registerUserAsync.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [registerUserAsync.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      localStorage.setItem(tokenKey, payload.token);
      state.user = payload;
    },
    [registerUserAsync.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
      state.error = payload.message;
    },
  },
});

export const { reset, setLogout } = userSlice.actions;

export default userSlice.reducer;
