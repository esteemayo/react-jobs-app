import { createSlice } from '@reduxjs/toolkit';
import { setToStorage } from 'utils';

const initialState = {
  darkMode: true,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
