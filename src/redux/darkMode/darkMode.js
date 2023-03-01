import { createSlice } from '@reduxjs/toolkit';
import { getFromStorage, setToStorage } from 'utils';

const darkMode = getFromStorage('darkMode');

const initialState = {
  darkMode: darkMode ?? true,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: (state) => {
      setToStorage('darkMode', !state.darkMode);
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
