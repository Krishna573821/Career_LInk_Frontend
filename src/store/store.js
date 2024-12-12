import { configureStore } from "@reduxjs/toolkit"; // Importing the function to configure the Redux store
import jobReducer from "./slices/jobSlice"; // Importing the reducer for handling job-related state
import userReducer from "./slices/userSlice"; // Importing the reducer for handling user authentication and profile state
import applicationReducer from "./slices/applicationSlice"; // Importing the reducer for handling job applications state
import updateProfileReducer from "./slices/updateProfileSlice"; // Importing the reducer for handling profile update state

// Configuring the Redux store with multiple slices (reducers) to manage different parts of the application state
const store = configureStore({
  reducer: {
    user: userReducer, // User slice responsible for authentication and user data
    jobs: jobReducer, // Job slice responsible for storing job listings and related data
    applications: applicationReducer, // Application slice for managing job applications
    updateProfile: updateProfileReducer // Profile update slice for handling profile modification requests
  },
});

// Exporting the configured store for use throughout the application
export default store;
