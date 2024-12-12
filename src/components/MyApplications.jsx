import React, { useEffect } from "react"; // Importing React and necessary hooks
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for state management
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { toast } from "react-toastify"; // Importing toast for displaying notifications
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice"; // Importing actions from Redux slice
import Spinner from "../components/Spinner"; // Importing Spinner component for loading state

const MyApplications = () => {
  // Getting the user and authentication status from Redux state
  const { user, isAuthenticated } = useSelector((state) => state.user);
  // Getting loading state, error, applications data, and success message from Redux state
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Fetch job applications when component mounts
  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  // Handling error and success messages
  useEffect(() => {
    if (error) {
      toast.error(error); // Display error message
      dispatch(clearAllApplicationErrors()); // Clear error after showing
    }
    if (message) {
      toast.success(message); // Display success message
      dispatch(resetApplicationSlice()); // Reset application state after success
      dispatch(fetchJobSeekerApplications()); // Fetch updated applications
    }
  }, [dispatch, error, message]);

  // Function to delete an application
  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id)); // Dispatch action to delete application by id
  };

  return (
    <>
      {loading ? ( // If data is loading, show Spinner component
        <Spinner />
      ) : applications && applications.length <= 0 ? ( // If no applications exist, show a message
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not applied for any job.
        </h1>
      ) : (
        // If applications are available, display them
        <>
          <div className="account_components">
            <h3>My Application For Jobs</h3>
            <div className="applications_container">
              {applications.map((element) => { // Mapping through applications to display each one
                return (
                  <div className="card" key={element._id}>
                    {/* Displaying job details and job seeker information */}
                    <p className="sub-sec">
                      <span>Job Title: </span> {element.jobInfo.jobTitle}
                    </p>
                    <p className="sub-sec">
                      <span>Name</span> {element.jobSeekerInfo.name}
                    </p>
                    <p className="sub-sec">
                      <span>Email</span> {element.jobSeekerInfo.email}
                    </p>
                    <p className="sub-sec">
                      <span>Phone: </span> {element.jobSeekerInfo.phone}
                    </p>
                    <p className="sub-sec">
                      <span>Address: </span> {element.jobSeekerInfo.address}
                    </p>
                    <p className="sub-sec">
                      <span>Coverletter: </span>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={5}
                        disabled
                      ></textarea>
                    </p>
                    {/* Buttons for deleting application and viewing resume */}
                    <div className="btn-wrapper">
                      <button
                        className="outline_btn"
                        onClick={() => handleDeleteApplication(element._id)}
                      >
                        Delete Application
                      </button>
                      <Link
                        to={
                          element.jobSeekerInfo &&
                          element.jobSeekerInfo.resume.url
                        }
                        className="btn"
                        target="_blank"
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

export default MyApplications;
