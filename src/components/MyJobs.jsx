import React, { useEffect } from "react"; // Importing React and necessary hooks
import { useSelector, useDispatch } from "react-redux"; // Redux hooks for state management
import { toast } from "react-toastify"; // Importing toast for notifications
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice"; // Importing actions from Redux slice
import Spinner from "../components/Spinner"; // Importing Spinner component for loading state

const MyJobs = () => {
  // Extracting loading state, error, job data (myJobs), and success message from Redux state
  const { loading, error, myJobs, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch(); // Hook to dispatch actions

  // useEffect to handle error, success message, and fetch jobs when component mounts or state changes
  useEffect(() => {
    if (error) {
      toast.error(error); // Display error message using toast
      dispatch(clearAllJobErrors()); // Clear errors after displaying
    }
    if (message) {
      toast.success(message); // Display success message
      dispatch(resetJobSlice()); // Reset job slice state after success
    }
    dispatch(getMyJobs()); // Fetch the jobs posted by the user
  }, [dispatch, error, message]); // Dependency array to re-run when error or message changes

  // Function to handle job deletion
  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id)); // Dispatch action to delete job by id
  };

  return (
    <>
      {loading ? ( // If loading is true, show Spinner component
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? ( // If no jobs are found, show a message
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        // If jobs are available, display them
        <>
          <div className="account_components">
            <h3>My Jobs</h3>
            <div className="applications_container">
              {myJobs.map((element) => (
                // Mapping through myJobs to display each job's details
                <div className="card" key={element._id}>
                  {/* Displaying various job details */}
                  <p className="sub-sec">
                    <span>Job Title: </span>
                    {element.title}
                  </p>
                  <p className="sub-sec">
                    <span>Job Niche:</span> {element.jobNiche}
                  </p>
                  <p className="sub-sec">
                    <span>Salary: </span> {element.salary}
                  </p>
                  <p className="sub-sec">
                    <span>Location:</span> {element.location}
                  </p>
                  <p className="sub-sec">
                    <span>Job Type:</span> {element.jobType}
                  </p>
                  <p className="sub-sec">
                    <span>Company Name:</span> {element.companyName}
                  </p>
                  <p className="sub-sec">
                    <span>Introduction:</span> {element.introduction}
                  </p>
                  <p className="sub-sec">
                    <span>Qualifications:</span> {element.qualifications}
                  </p>
                  <p className="sub-sec">
                    <span>Responsibilities:</span> {element.responsibilities}
                  </p>
                  {/* If there are additional offers, display them */}
                  {element.offers && (
                    <p className="sub-sec">
                      <span>What Are We Offering:</span> {element.offers}
                    </p>
                  )}
                  {/* Button to delete the job */}
                  <button
                    className="btn"
                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
