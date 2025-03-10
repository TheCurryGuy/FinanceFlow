import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:3000";
const getAuthToken = () => localStorage.getItem('token');

export const createBudget = createAsyncThunk(
  'budget/createBudget',
  async (budgetData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(`${API_URL}/api/budgets`, budgetData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBudgets = createAsyncThunk(
  'budget/fetchBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/api/budgets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    budgets: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    updateBudget: (state, action) => {
      const updatedBudget = action.payload;
      const index = state.budgets.findIndex(budget => budget._id === updatedBudget._id);
      if (index !== -1) {
        // *** Absolutely Guaranteed Immutability ***
        const newBudgets = [...state.budgets]; // Create a new array
        newBudgets[index] = updatedBudget;    // Replace the item at the index
        state.budgets = newBudgets;           // Assign the new array
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBudget.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets = [...state.budgets, action.payload]; // Immutable add
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchBudgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateBudget } = budgetSlice.actions;
export default budgetSlice.reducer;