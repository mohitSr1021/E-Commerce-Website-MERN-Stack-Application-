import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const token = JSON.parse(localStorage.getItem("token"));
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoStorage,
  token: token || "",
  loading: false,
  error: null,
};

// Async thunk action
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/auth/login", userCredentials, {
        headers: { Authorization: token },
      });
      if (data?.success) {
        localStorage.setItem("userInfo", JSON.stringify(data?.user));
        localStorage.setItem("token", JSON.stringify(data?.token));
        return data;
      } else {
        toast.error(data.msg);
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
      return rejectWithValue(error);
    }
  }
);
// Async thunk action for updating user profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put("/api/v1/auth/profile", userData, {
        headers: { Authorization: token },
      });
      if (data?.success) {
        toast.success(data.msg);
        localStorage.setItem("userInfo", JSON.stringify(data?.updatedUser));
        return data;
      } else {
        toast.error(data.msg || "Failed to update profile.");
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An error occurred during profile update.");
      return rejectWithValue(error);
    }
  }
);
// Async thunk action for updating Admin details
export const updateAdminDetails = createAsyncThunk(
  "auth/updateAdminDetails",
  async (adminData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "/api/v1/auth/admin/details",
        adminData,
        {
          headers: { Authorization: token },
        }
      );
      if (data?.success) {
        localStorage.setItem("userInfo", JSON.stringify(data?.updatedUser));
        return data;
      } else {
        toast.error(data.msg || "Failed to update admin profile.");
        return rejectWithValue(data);
      }
    } catch (error) {
      console.error("Admin profile update error:", error);
      toast.error("An error occurred during admin profile update.");
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      state.user = null;
      state.token = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "An error occurred during login.";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.success) {
          state.user = { ...state.user, ...action.payload.updatedUser };
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message || "An error occurred during profile update.";
      })
      .addCase(updateAdminDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminDetails.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.success) {
          state.user = { ...state.user, ...action.payload.updatedUser };
        }
      })
      .addCase(updateAdminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload.message ||
          "An error occurred during admin profile update.";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
