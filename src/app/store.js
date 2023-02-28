import { configureStore } from '@reduxjs/toolkit';

import jobReducer from 'redux/jobs/jobSlice';
import userReducer from 'redux/users/userSlice';
import darkModeReducer from 'redux/darkMode/darkMode';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    darkMode: darkModeReducer,
  },
});

export default store;
