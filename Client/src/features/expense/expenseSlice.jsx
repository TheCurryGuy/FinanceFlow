import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:3000";

// Helper function to get the token
const getAuthToken = () => localStorage.getItem('token');

export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/api/expenses`, expenseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      // *** KEY CHANGE: Correctly use rejectWithValue ***
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Pass the error data
      } else {
        return rejectWithValue({ error: 'An unexpected error occurred.' }); // Generic error
      }
    }
  }
);


export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/api/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Correctly handle errors
    }
  }
);

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExpense.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existingExpense = state.expenses.find(exp => exp._id === action.payload._id);
        if (!existingExpense) {
          state.expenses.unshift(action.payload);
        }
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Store the ENTIRE payload
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Store the ENTIRE payload
      });
  },
});

export default expenseSlice.reducer;