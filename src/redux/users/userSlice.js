import jwtDecode from 'jwt-decode';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as userAPI from 'services/userService';
import { getFromStorage, removeFromStorage, setToStorage, tokenKey } from 'utils';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ user, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.login({ ...user });
      toast.success('Login successful');
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ user, toast }, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.register({ ...user });
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

const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);
  const expiredToken = decodedToken.exp * 1000;

  if (expiredToken < Date.now()) {
    removeFromStorage(tokenKey);
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
    [loginUser.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
      state.error = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true;
      state.showAlert = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      setToStorage(tokenKey, payload);
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.user = null;
      state.showAlert = true;
      state.error = payload.message;
    },
  },
});

export const { reset, setLogout } = userSlice.actions;

export default userSlice.reducer;
