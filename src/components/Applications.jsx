import React, { useEffect } from "react"; // Importing React and useEffect hook
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks to manage state and dispatch actions
import { toast } from "react-toastify"; // Importing toast for notifications
import {
   clearAllApplicationErrors, // Action to clear all errors
   deleteApplication, // Action to delete an application
   fetchEmployerApplications, // Action to fetch applications for the employer
   resetApplicationSlice, // Action to reset the application slice
} from "../store/slices/applicationSlice"; // Importing actions from the applicationSlice
import Spinner from "./Spinner"; // Importing a Spinner component for loading state
import { Link } from "react-router-dom"; // Importing Link component for navigation

const Applications = () => {
   // Destructuring the state from Redux store: applications, loading, error, and message
   const { applications, loading, error, message } = useSelector(
      (state) => state.applications
   );

   // Initializing dispatch to dispatch actions
   const dispatch = useDispatch();

   useEffect(() => {
      // If there's an error, show an error toast and clear the error
      if (error) {
         toast.error(error); // Show error notification
         dispatch(clearAllApplicationErrors()); // Clear errors from state
      }

      // If there's a success message, show a success toast and reset the application slice
      if (message) {
         toast.success(message); // Show success notification
         dispatch(resetApplicationSlice()); // Reset the application slice in the state
      }

      // Fetch applications for the employer when the component mounts or dependencies change
      dispatch(fetchEmployerApplications());
   }, [dispatch, error, message]); // Dependencies: dispatch, error, and message

   // Handler function to delete an application
   const handleDeleteApplication = (id) => {
      dispatch(deleteApplication(id)); // Dispatch the delete action with the application ID
   };

   return (
      <>
         {loading ? ( // If loading, show the spinner
            <Spinner />
         ) : applications && applications.length <= 0 ? ( // If no applications, show a message
            <h1>You have no applications from job seekers.</h1>
         ) : (
            <>
               {/* Main container for displaying the applications */}
               <div className="account_components">
                  <h3>Applications For Your Posted Jobs</h3>
                  <div className="applications_container">
                     {/* Map over the applications array to render each application */}
                     {applications.map((element) => {
                        return (
                           <div className="card" key={element._id}> {/* Card for each application */}
                              <p className="sub-sec">
                                 <span>Job Title: </span>{" "}
                                 {element.jobInfo.jobTitle} {/* Display job title */}
                              </p>
                              <p className="sub-sec">
                                 <span>Applicant's Name: </span>{" "}
                                 {element.jobSeekerInfo.name} {/* Display applicant's name */}
                              </p>
                              <p className="sub-sec">
                                 <span>Applicant's Email:</span>{" "}
                                 {element.jobSeekerInfo.email} {/* Display applicant's email */}
                              </p>
                              <p className="sub-sec">
                                 <span>Applicant's Phone: </span>{" "}
                                 {element.jobSeekerInfo.phone} {/* Display applicant's phone */}
                              </p>
                              <p className="sub-sec">
                                 <span>Applicant's Address: </span>{" "}
                                 {element.jobSeekerInfo.address} {/* Display applicant's address */}
                              </p>
                              <p className="sub-sec">
                                 <span>Applicant's CoverLetter: </span>
                                 <textarea
                                    value={element.jobSeekerInfo.coverLetter} // Display applicant's cover letter
                                    rows={5}
                                    disabled // Disable editing of the cover letter
                                 ></textarea>
                              </p>
                              {/* Button wrapper for delete and view resume */}
                              <div className="btn-wrapper">
                                 <button
                                    className="outline_btn"
                                    onClick={() =>
                                       handleDeleteApplication(element._id) // Call delete function when clicked
                                    }
                                 >
                                    Delete Application
                                 </button>
                                 <Link
                                    to={`${element.jobSeekerInfo.resume.url.replace(
                                       "/raw/",
                                       "/image/"
                                    )}`} // Replace URL part to view resume image
                                    className="btn"
                                    target="_blank" // Open in a new tab
                                 >
                                    View Resume
                                 </Link>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default Applications; // Exporting the Applications component to be used elsewhere
