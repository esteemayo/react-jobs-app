import { createSlice } from '@reduxjs/toolkit';
import { darkModeKey, getFromStorage, setToStorage } from 'utils';

const darkMode = getFromStorage(darkModeKey);

const initialState = {
  darkMode: darkMode ?? true,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: (state) => {
      setToStorage(darkModeKey, !state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
