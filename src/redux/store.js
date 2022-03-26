import { configureStore } from '@reduxjs/toolkit';

import jobReducer from './jobs';
import userReducer from './user';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
});

export default store;
