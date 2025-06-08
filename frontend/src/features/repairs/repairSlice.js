import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/repairs';

// Get all repairs
export const getRepairs = createAsyncThunk(
  'repairs/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new repair
export const createRepair = createAsyncThunk(
  'repairs/create',
  async (repairData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.post(API_URL, repairData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update repair status
export const updateRepairStatus = createAsyncThunk(
  'repairs/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(`${API_URL}/${id}/status`, { status }, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add parts to repair
export const addRepairParts = createAsyncThunk(
  'repairs/addParts',
  async ({ id, parts }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(`${API_URL}/${id}/parts`, { parts }, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update repair diagnosis
export const updateRepairDiagnosis = createAsyncThunk(
  'repairs/updateDiagnosis',
  async ({ id, diagnosis }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const response = await axios.put(`${API_URL}/${id}/diagnosis`, { diagnosis }, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  repairs: [],
  isLoading: false,
  error: null,
  success: false,
  message: ''
};

const repairSlice = createSlice({
  name: 'repairs',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all repairs
      .addCase(getRepairs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRepairs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.repairs = action.payload;
      })
      .addCase(getRepairs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create repair
      .addCase(createRepair.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRepair.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.repairs.push(action.payload);
      })
      .addCase(createRepair.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update repair status
      .addCase(updateRepairStatus.fulfilled, (state, action) => {
        const index = state.repairs.findIndex(repair => repair._id === action.payload._id);
        if (index !== -1) {
          state.repairs[index] = action.payload;
        }
      })
      // Add repair parts
      .addCase(addRepairParts.fulfilled, (state, action) => {
        const index = state.repairs.findIndex(repair => repair._id === action.payload._id);
        if (index !== -1) {
          state.repairs[index] = action.payload;
        }
      })
      // Update repair diagnosis
      .addCase(updateRepairDiagnosis.fulfilled, (state, action) => {
        const index = state.repairs.findIndex(repair => repair._id === action.payload._id);
        if (index !== -1) {
          state.repairs[index] = action.payload;
        }
      });
  }
});

export const { reset } = repairSlice.actions;
export default repairSlice.reducer; 