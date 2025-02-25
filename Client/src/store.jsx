import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import expenseReducer from './features/expense/expenseSlice';
import budgetReducer from './features/budget/budgetSlice'; 
import goalReducer from './features/goal/goalSlice'; 

export default configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    budget: budgetReducer, 
    goal: goalReducer,   
  },
});