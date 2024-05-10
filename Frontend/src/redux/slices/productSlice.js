import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action or Middleware
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async ({ page, limit }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/all-products?page=${page}&limit=${limit}`
      );
      if (data?.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    data: [],
    currentPage: 1, // New state for current page
    totalPages: 1, // New state for total pages
    isError: false,
  },
  reducers: {
    updateProducts: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });

    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
export const { updateProducts } = productSlice.actions;
