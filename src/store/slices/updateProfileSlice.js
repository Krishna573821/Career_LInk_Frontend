import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a slice for handling profile and password update states
const updateProfileSlice = createSlice({
  name: "updateProfile", // Slice name
  initialState: {
    loading: false, // To track if the request is loading
    error: null, // To store any error messages
    isUpdated: false, // To track if the profile was successfully updated
  },
  reducers: {
    // Reducer to handle profile update request state (set loading to true)
    updateProfileRequest(state, action) {
      state.loading = true;
    },
    // Reducer to handle successful profile update
    updateProfileSuccess(state, action) {
      state.error = null; // Reset error
      state.loading = false; // Set loading to false after success
      state.isUpdated = true; // Mark as successfully updated
    },
    // Reducer to handle failed profile update
    updateProfileFailed(state, action) {
      state.error = action.payload; // Set the error message
      state.loading = false; // Set loading to false
      state.isUpdated = false; // Mark as not updated
    },
    // Reducer to handle password update request state (set loading to true)
    updatePasswordRequest(state, action) {
      state.loading = true;
    },
    // Reducer to handle successful password update
    updatePasswordSuccess(state, action) {
      state.error = null; // Reset error
      state.loading = false; // Set loading to false after success
      state.isUpdated = true; // Mark as successfully updated
    },
    // Reducer to handle failed password update
    updatePasswordFailed(state, action) {
      state.error = action.payload; // Set the error message
      state.loading = false; // Set loading to false
      state.isUpdated = false; // Mark as not updated
    },
    // Reset profile and password update state after an update attempt
    profileResetAfterUpdate(state, action) {
      state.error = null; // Reset error
      state.isUpdated = false; // Reset update status
      state.loading = false; // Reset loading state
    },
  },
});

// Async thunk to handle profile update request
export const updateProfile = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updateProfileRequest()); // Dispatch request action
  try {
    // Sending PUT request to update profile
    const response = await axios.put(
      "https://career-link-backend-62pl.onrender.com/api/v1/user/update/profile",
      data, // Profile data to be updated
      {
        withCredentials: true, // Include cookies in the request
        headers: { "Content-Type": "multipart/form-data" }, // For file uploads
      }
    );
    // Dispatch success action if the update is successful
    dispatch(updateProfileSlice.actions.updateProfileSuccess());
  } catch (error) {
    // Dispatch failure action if the update fails
    dispatch(
      updateProfileSlice.actions.updateProfileFailed(
        error.response.data.message || "Failed to update profile."
      )
    );
  }
};

// Async thunk to handle password update request
export const updatePassword = (data) => async (dispatch) => {
  dispatch(updateProfileSlice.actions.updatePasswordRequest()); // Dispatch request action
  try {
    // Sending PUT request to update password
    const response = await axios.put(
      "https://career-link-backend-62pl.onrender.com/api/v1/user/update/password",
      data, // Password data to be updated
      {
        withCredentials: true, // Include cookies in the request
        headers: { "Content-Type": "application/json" }, // For JSON data
      }
    );
    // Dispatch success action if the update is successful
    dispatch(updateProfileSlice.actions.updatePasswordSuccess());
  } catch (error) {
    // Dispatch failure action if the update fails
    dispatch(
      updateProfileSlice.actions.updatePasswordFailed(
        error.response.data.message || "Failed to update password."
      )
    );
  }
};

// Action to clear all errors and reset the profile update state
export const clearAllUpdateProfileErrors = () => (dispatch) => {
  dispatch(updateProfileSlice.actions.profileResetAfterUpdate());
};

export default updateProfileSlice.reducer; // Export the reducer for the slice
