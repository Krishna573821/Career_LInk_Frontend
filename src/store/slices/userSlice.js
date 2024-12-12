import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create a slice for handling user authentication, registration, and logout state
const userSlice = createSlice({
  name: "user", // Slice name
  initialState: {
    loading: false, // Tracks the loading state during async operations
    isAuthenticated: false, // Tracks if the user is authenticated or not
    user: {}, // Stores user information after login or registration
    error: null, // Stores any error messages
    message: null, // Stores success messages
  },
  reducers: {
    // Reducer to handle the register request state (set loading to true and reset previous state)
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    // Reducer to handle successful registration
    registerSuccess(state, action) {
      state.loading = false; // Set loading to false after success
      state.isAuthenticated = true; // Set user as authenticated
      state.user = action.payload.user; // Set user information from the payload
      state.error = null; // Reset error
      state.message = action.payload.message; // Set success message
    },
    // Reducer to handle failed registration
    registerFailed(state, action) {
      state.loading = false; // Set loading to false after failure
      state.isAuthenticated = false; // Ensure user is not authenticated
      state.user = {}; // Reset user data
      state.error = action.payload; // Set error message
      state.message = null; // Reset message
    },
    // Reducer to handle the login request state (set loading to true and reset previous state)
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = null;
    },
    // Reducer to handle successful login
    loginSuccess(state, action) {
      state.loading = false; // Set loading to false after success
      state.isAuthenticated = true; // Set user as authenticated
      state.user = action.payload.user; // Set user information from the payload
      state.error = null; // Reset error
      state.message = action.payload.message; // Set success message
    },
    // Reducer to handle failed login
    loginFailed(state, action) {
      state.loading = false; // Set loading to false after failure
      state.isAuthenticated = false; // Ensure user is not authenticated
      state.user = {}; // Reset user data
      state.error = action.payload; // Set error message
      state.message = null; // Reset message
    },
    // Reducer to handle fetching user details request state
    fetchUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    // Reducer to handle successful fetching of user details
    fetchUserSuccess(state, action) {
      state.loading = false; // Set loading to false after success
      state.isAuthenticated = true; // Set user as authenticated
      state.user = action.payload; // Set user information from the payload
      state.error = null; // Reset error
    },
    // Reducer to handle failed fetching of user details
    fetchUserFailed(state, action) {
      state.loading = false; // Set loading to false after failure
      state.isAuthenticated = false; // Ensure user is not authenticated
      state.user = {}; // Reset user data
      state.error = action.payload; // Set error message
    },
    // Reducer to handle logout success
    logoutSuccess(state, action) {
      state.isAuthenticated = false; // Mark user as not authenticated
      state.user = {}; // Reset user data
      state.error = null; // Reset error
    },
    // Reducer to handle logout failure
    logoutFailed(state, action) {
      state.isAuthenticated = state.isAuthenticated; // Keep current authentication state
      state.user = state.user; // Keep current user data
      state.error = action.payload; // Set error message
    },
    // Reducer to clear all errors from the state
    clearAllErrors(state, action) {
      state.error = null; // Reset error
      state.user = state.user; // Keep current user data
    },
  },
});

// Async thunk to handle user registration
export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest()); // Dispatch register request action
  try {
    const response = await axios.post(
      "/api/v1/user/register",
      data, // User data to register
      {
        withCredentials: true, // Include credentials in the request
        headers: { "Content-Type": "multipart/form-data" }, // For file uploads
      }
    );
    dispatch(userSlice.actions.registerSuccess(response.data)); // Dispatch success action with response data
    dispatch(userSlice.actions.clearAllErrors()); // Clear errors
  } catch (error) {
    dispatch(userSlice.actions.registerFailed(error.response.data.message)); // Dispatch failure action with error message
  }
};

// Async thunk to handle user login
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest()); // Dispatch login request action
  try {
    const response = await axios.post(
      "/api/v1/user/login",
      data, // Login data
      {
        withCredentials: true, // Include credentials in the request
        headers: { "Content-Type": "application/json" }, // For JSON data
      }
    );
    dispatch(userSlice.actions.loginSuccess(response.data)); // Dispatch success action with response data
    dispatch(userSlice.actions.clearAllErrors()); // Clear errors
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message)); // Dispatch failure action with error message
  }
};

// Async thunk to fetch the current authenticated user details
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchUserRequest()); // Dispatch fetch user request action
  try {
    const response = await axios.get(
      "/api/v1/user/getuser", // API endpoint to fetch user
      {
        withCredentials: true, // Include credentials in the request
      }
    );
    dispatch(userSlice.actions.fetchUserSuccess(response.data.user)); // Dispatch success action with user data
    dispatch(userSlice.actions.clearAllErrors()); // Clear errors
  } catch (error) {
    dispatch(userSlice.actions.fetchUserFailed(error.response.data.message)); // Dispatch failure action with error message
  }
};

// Async thunk to handle user logout
export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "/api/v1/user/logout", // API endpoint to logout
      {
        withCredentials: true, // Include credentials in the request
      }
    );
    dispatch(userSlice.actions.logoutSuccess()); // Dispatch logout success action
    dispatch(userSlice.actions.clearAllErrors()); // Clear errors
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed(error.response.data.message)); // Dispatch logout failure action with error message
  }
};

// Action to clear all errors related to user actions
export const clearAllUserErrors = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllErrors()); // Dispatch action to clear all errors
};

export default userSlice.reducer; // Export the reducer for the slice
