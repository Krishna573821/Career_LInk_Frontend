import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit to manage the state slice.
import axios from "axios"; // Importing axios for making HTTP requests.

// Defining the applicationSlice using createSlice to manage the applications state and actions.
const applicationSlice = createSlice({
  name: "applications", // Name of the slice.
  initialState: { // Initial state of the slice.
    applications: [], // Holds the list of applications.
    loading: false, // Indicates whether an application-related action is in progress.
    error: null, // Holds any error messages that may occur.
    message: null, // Holds any success messages.
  },
  reducers: { // Defining the actions that can be dispatched.
    // Actions for fetching all applications.
    requestForAllApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForAllApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Actions for fetching the current user's (job seeker's) applications.
    requestForMyApplications(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplications(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failureForMyApplications(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Actions for posting a new application.
    requestForPostApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForPostApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    // Actions for deleting an application.
    requestForDeleteApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Action to clear all errors from the state.
    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications; // Ensuring applications list is unchanged.
    },
    // Action to reset the application slice state.
    resetApplicationSlice(state, action) {
      state.error = null;
      state.applications = state.applications; // Ensuring applications list is unchanged.
      state.message = null;
      state.loading = false;
    },
  },
});

// Action to fetch all employer applications from the server.
export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplications());
  try {
    const response = await axios.get(
      `/api/v1/application/employer/getall`, // Endpoint for fetching all employer applications.
      {
        withCredentials: true, // Ensures cookies are sent with the request.
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplications(
        response.data.applications // Storing fetched applications in the state.
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForAllApplications(
        error.response.data.message // Handling failure by storing error message in the state.
      )
    );
  }
};

// Action to fetch job seeker applications from the server.
export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplications());
  try {
    const response = await axios.get(
      `/api/v1/application/jobseeker/getall`, // Endpoint for fetching job seeker's applications.
      {
        withCredentials: true, // Ensures cookies are sent with the request.
      }
    );
    dispatch(
      applicationSlice.actions.successForMyApplications(
        response.data.applications // Storing fetched applications in the state.
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForMyApplications(
        error.response.data.message // Handling failure by storing error message in the state.
      )
    );
  }
};

// Action to post a new job application.
export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `/api/v1/application/post/${jobId}`, // Endpoint for posting an application.
      data, // Application data to be posted.
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // Setting appropriate content type for file uploads.
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message) // Storing success message in the state.
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForPostApplication(
        error.response.data.message // Handling failure by storing error message in the state.
      )
    );
  }
};

// Action to delete a specific application.
export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `/api/v1/application/delete/${id}`, // Endpoint for deleting an application by ID.
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message // Storing success message in the state.
      )
    );
    dispatch(clearAllApplicationErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message // Handling failure by storing error message in the state.
      )
    );
  }
};

// Action to clear all application-related errors.
export const clearAllApplicationErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

// Action to reset the application slice state.
export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

// Exporting the reducer to be used in the store.
export default applicationSlice.reducer;
