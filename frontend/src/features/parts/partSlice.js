import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import httpRequest from '../../utils/request';

// Get parts
export const getParts = createAsyncThunk(
  'parts/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await httpRequest.get('/parts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create part
export const createPart = createAsyncThunk(
  'parts/create',
  async (partData, thunkAPI) => {
    try {
      const response = await httpRequest.post('/parts', partData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update part
export const updatePart = createAsyncThunk(
  'parts/update',
  async ({ id, partData }, thunkAPI) => {
    try {
      const response = await httpRequest.put(`/parts/${id}`, partData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Delete part
export const deletePart = createAsyncThunk(
  'parts/delete',
  async (id, thunkAPI) => {
    try {
      await httpRequest.delete(`/parts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update part stock
export const updatePartStock = createAsyncThunk(
  'parts/updateStock',
  async ({ id, quantity }, thunkAPI) => {
    try {
      const response = await httpRequest.put(`/parts/${id}/stock`, { quantity });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  parts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

const partSlice = createSlice({
  name: 'parts',
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
      .addCase(getParts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = action.payload;
      })
      .addCase(getParts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createPart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts.push(action.payload);
      })
      .addCase(createPart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.parts.findIndex(part => part._id === action.payload._id);
        if (index !== -1) {
          state.parts[index] = action.payload;
        }
      })
      .addCase(updatePart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.parts = state.parts.filter(part => part._id !== action.payload);
      })
      .addCase(deletePart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePartStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePartStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.parts.findIndex(part => part._id === action.payload._id);
        if (index !== -1) {
          state.parts[index] = action.payload;
        }
      })
      .addCase(updatePartStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = partSlice.actions;
export default partSlice.reducer; 