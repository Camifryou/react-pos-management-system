import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../utils/request';

// Get repairs
export const getRepairs = createAsyncThunk(
  'repairs/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await httpRequest.get('/repairs');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create repair
export const createRepair = createAsyncThunk(
  'repairs/create',
  async (repairData, thunkAPI) => {
    try {
      const response = await httpRequest.post('/repairs', repairData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update repair
export const updateRepair = createAsyncThunk(
  'repairs/update',
  async ({ id, repairData }, thunkAPI) => {
    try {
      const response = await httpRequest.put(`/repairs/${id}`, repairData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete repair
export const deleteRepair = createAsyncThunk(
  'repairs/delete',
  async (id, thunkAPI) => {
    try {
      await httpRequest.delete(`/repairs/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  repairs: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

const repairSlice = createSlice({
  name: 'repairs',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRepairs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRepairs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.repairs = action.payload;
      })
      .addCase(getRepairs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRepair.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRepair.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.repairs.push(action.payload);
      })
      .addCase(createRepair.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRepair.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRepair.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.repairs.findIndex(repair => repair._id === action.payload._id);
        if (index !== -1) {
          state.repairs[index] = action.payload;
        }
      })
      .addCase(updateRepair.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRepair.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRepair.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.repairs = state.repairs.filter(repair => repair._id !== action.payload);
      })
      .addCase(deleteRepair.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = repairSlice.actions;
export default repairSlice.reducer; 