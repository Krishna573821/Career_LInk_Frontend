import { createSlice } from "@reduxjs/toolkit";  // Importing createSlice from Redux Toolkit for easier slice creation
import axios from "axios";  // Importing axios for making HTTP requests

// Creating the job slice with initial state and reducers to handle job-related actions
const jobSlice = createSlice({
  name: "jobs",  // Name of the slice
  initialState: {
    jobs: [],  // List of jobs
    loading: false,  // Loading state for asynchronous operations
    error: null,  // Error state to handle any errors
    message: null,  // Message state for success messages
    singleJob: {},  // Store for a single job's details
    myJobs: [],  // Store for the jobs posted by the current user
  },
  reducers: {
    // Reducer for handling the loading state when fetching all jobs
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    // Reducer for successfully fetching all jobs
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;  // Update the jobs state with the fetched data
      state.error = null;
    },
    // Reducer for failing to fetch all jobs
    failureForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;  // Set the error message
    },
    // Reducer for handling the loading state when fetching a single job
    requestForSingleJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    // Reducer for successfully fetching a single job
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;  // Store the single job details
    },
    // Reducer for failing to fetch a single job
    failureForSingleJob(state, action) {
      state.singleJob = state.singleJob;  // Keep the previous job data if there's an error
      state.error = action.payload;
      state.loading = false;
    },
    // Reducer for handling the loading state when posting a job
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    // Reducer for successfully posting a job
    successForPostJob(state, action) {
      state.message = action.payload;  // Set the success message
      state.error = null;
      state.loading = false;
    },
    // Reducer for failing to post a job
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;  // Set the error message
      state.loading = false;
    },

    // Reducer for handling the loading state when deleting a job
    requestForDeleteJob(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    // Reducer for successfully deleting a job
    successForDeleteJob(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;  // Set the success message
    },
    // Reducer for failing to delete a job
    failureForDeleteJob(state, action) {
      state.loading = false;
      state.error = action.payload;  // Set the error message
      state.message = null;
    },

    // Reducer for handling the loading state when fetching the user's jobs
    requestForMyJobs(state, action) {
      state.loading = true;
      state.myJobs = [];  // Clear the current list of my jobs
      state.error = null;
    },
    // Reducer for successfully fetching the user's jobs
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;  // Update with the list of user's jobs
      state.error = null;
    },
    // Reducer for failing to fetch the user's jobs
    failureForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;  // Keep the previous list of my jobs
      state.error = action.payload;
    },

    // Reducer to clear all error states
    clearAllErrors(state, action) {
      state.error = null;
      state.jobs = state.jobs;  // Retain the jobs state
    },
    // Reducer to reset the job slice's state to initial state
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;  // Retain the jobs state
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;  // Retain the user's jobs state
      state.singleJob = {};  // Reset the single job state
    },
  },
});

// Async action to fetch jobs with optional filters for city, niche, and searchKeyword
export const fetchJobs =
  (city, niche, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());  // Dispatch the loading state
      let link = "/api/v1/job/getall?";  // Base API endpoint for fetching all jobs
      let queryParams = [];  // Array to hold query parameters for the request
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);  // Add search keyword filter if provided
      }
      if (city && city !== "All") {
        queryParams.push(`city=${city}`);  // Add city filter if provided
      }

      /***************************************************/
      /* BUG No.3: Fixing city filter to handle "All" case */
      if (city && city === "All") {
        queryParams = [];
        if (searchKeyword) {
          queryParams.push(`searchKeyword=${searchKeyword}`);
        }
      }
      /***************************************************/

      if (niche) {
        queryParams.push(`niche=${niche}`);  // Add niche filter if provided
      }

      /***************************************************/
      /* BUG No.4: Fixing niche filter to handle "All" case */
      if (niche && niche === "All") {
        queryParams = [];
        if (searchKeyword) {
          queryParams.push(`searchKeyword=${searchKeyword}`);
        }
        if (city && city !== "All") {
          queryParams.push(`city=${city}`);
        }
      }
      /***************************************************/

      link += queryParams.join("&");  // Append the query parameters to the URL
      const response = await axios.get(link, { withCredentials: true });  // Send the GET request with query params
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));  // Dispatch the success action
      dispatch(jobSlice.actions.clearAllErrors());  // Clear any errors
    } catch (error) {
      dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));  // Dispatch the failure action
    }
  };

// Async action to fetch a single job by ID
export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());  // Dispatch the loading state
  try {
    const response = await axios.get(`/api/v1/job/get/${jobId}`, { withCredentials: true });  // Send the GET request for the job
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));  // Dispatch the success action
    dispatch(jobSlice.actions.clearAllErrors());  // Clear any errors
  } catch (error) {
    dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));  // Dispatch the failure action
  }
};

// Async action to post a new job
export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());  // Dispatch the loading state
  try {
    const response = await axios.post(`/api/v1/job/post`, data, {  // Send the POST request to create a job
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    dispatch(jobSlice.actions.successForPostJob(response.data.message));  // Dispatch the success action
    dispatch(jobSlice.actions.clearAllErrors());  // Clear any errors
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));  // Dispatch the failure action
  }
};

// Async action to fetch the jobs posted by the current user
export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());  // Dispatch the loading state
  try {
    const response = await axios.get(`/api/v1/job/getmyjobs`, { withCredentials: true });  // Send the GET request for the user's jobs
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));  // Dispatch the success action
    dispatch(jobSlice.actions.clearAllErrors());  // Clear any errors
  } catch (error) {
    dispatch(jobSlice.actions.failureForMyJobs(error.response.data.message));  // Dispatch the failure action
  }
};

// Async action to delete a job by ID
export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeleteJob());  // Dispatch the loading state
  try {
    const response = await axios.delete(`/api/v1/job/delete/${id}`, { withCredentials: true });  // Send the DELETE request to remove a job
    dispatch(jobSlice.actions.successForDeleteJob(response.data.message));  // Dispatch the success action
    dispatch(clearAllJobErrors());  // Clear any errors
  } catch (error) {
    dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));  // Dispatch the failure action
  }
};

// Action to clear all job-related errors
export const clearAllJobErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErrors());
};

// Action to reset the job slice to its initial state
export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

// Exporting the reducer for use in the store
export default jobSlice.reducer;
