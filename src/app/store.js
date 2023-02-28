import { configureStore } from '@reduxjs/toolkit';

import jobReducer from 'redux/jobs/jobSlice';
import darkModeReducer from 'redux/darkMode/darkMode';
import userReducer from 'redux/users/userSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
