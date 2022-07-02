import { configureStore } from '@reduxjs/toolkit';

import jobReducer from './jobs/jobSlice';
import userReducer from './users/userSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});

export default store;
