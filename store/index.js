// store.js

import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const rootReducer = {
  data: dataReducer,
  // ...other reducers if you have them
};

export default configureStore({
  reducer: rootReducer,
});
