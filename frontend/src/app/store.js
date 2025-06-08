import { configureStore } from '@reduxjs/toolkit';
import repairReducer from '../features/repairs/repairSlice'
import customerReducer from '../features/customers/customerSlice'
import partReducer from '../features/parts/partSlice'

export const store = configureStore({
  reducer: {
    repairs: repairReducer,
    customers: customerReducer,
    parts: partReducer
  },
});
