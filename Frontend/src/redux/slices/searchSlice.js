import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProduct = createAsyncThunk(
  "search/searchProduct",
  async (searchTerm) => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/product-search/${searchTerm}`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  searchResults: JSON.parse(localStorage.getItem("searchResults")) || [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      localStorage.setItem("searchResults", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
        localStorage.setItem(
          "searchResults",
          JSON.stringify(action.payload.results)
        );
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
