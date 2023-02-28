import { configureStore } from '@reduxjs/toolkit';

import jobReducer from '../redux/jobs/jobSlice';
import userReducer from '../redux/users/userSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});

export default store;
