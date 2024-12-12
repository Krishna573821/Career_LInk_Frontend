import "./Applications.css"; // Importing the CSS for styling the application page
import React, { useEffect, useState } from "react"; // Importing React and hooks for managing component state and side-effects
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks for accessing state and dispatching actions
import { Link, useNavigate, useParams } from "react-router-dom"; // Importing React Router hooks for navigation and URL parameter extraction
import {
   clearAllApplicationErrors,
   postApplication,
   resetApplicationSlice,
} from "../../store/slices/applicationSlice"; // Importing actions for application state management
import { toast } from "react-toastify"; // Importing the toast library for displaying notifications
import { fetchSingleJob } from "../../store/slices/jobSlice"; // Importing action to fetch job details
import { IoMdCash } from "react-icons/io"; // Importing icons for UI
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
   // Accessing Redux state for single job details, user details, and application status
   const { singleJob } = useSelector((state) => state.jobs);
   const { isAuthenticated, user } = useSelector((state) => state.user);
   const { loading, error, message } = useSelector(
      (state) => state.applications
   );

   // Extracting jobId from URL parameters
   const { jobId } = useParams();

   // Local component state for managing form data
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [address, setAddress] = useState("");
   const [coverLetter, setCoverLetter] = useState("");
   const [resume, setResume] = useState("");

   // Navigation and dispatch hooks for performing side effects
   const navigateTo = useNavigate();
   const dispatch = useDispatch();

   // Handle form submission for posting the application
   const handlePostApplication = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("coverLetter", coverLetter);
      if (resume) {
         formData.append("resume", resume);
      }
      dispatch(postApplication(formData, jobId)); // Dispatch action to post the application
   };

   // useEffect hook for initial setup and handling side effects
   useEffect(() => {
      if (user) {
         setName(user.name || "");
         setEmail(user.email || "");
         setPhone(user.phone || "");
         setAddress(user.address || "");
         setCoverLetter(user.coverLetter || "");
         setResume((user.resume && user.resume.url) || "");
      }
      if (error) {
         toast.error(error); // Display error if any
         dispatch(clearAllApplicationErrors()); // Clear errors after displaying
      }
      if (message) {
         toast.success(message); // Display success message if application was successful
         dispatch(resetApplicationSlice()); // Reset the application slice after success
      }
      dispatch(fetchSingleJob(jobId)); // Fetch the job details when the component mounts
   }, [dispatch, error, message, jobId, user]);

   // Processing qualifications, responsibilities, and offers into arrays
   let qualifications = [];
   let responsibilities = [];
   let offering = [];
   if (singleJob.qualifications) {
      qualifications = singleJob.qualifications.split(". "); // Splitting qualifications into an array
   }
   if (singleJob.responsibilities) {
      responsibilities = singleJob.responsibilities.split(". "); // Splitting responsibilities into an array
   }
   if (singleJob.offers) {
      offering = singleJob.offers.split(". "); // Splitting offerings into an array
   }

   // Handler for resume file upload
   const resumeHandler = (e) => {
      const file = e.target.files[0];
      setResume(file); // Setting the uploaded file to the state
   };

   return (
      <>
         <article className="application_page">
            <form>
               <h3>Application Form</h3>
               {/* Job title display (disabled input field) */}
               <div>
                  <label>Job Title</label>
                  <input type="text" placeholder={singleJob.title} disabled />
               </div>
               {/* Personal information fields */}
               <div>
                  <label>Your Name</label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div>
                  <label>Your Email</label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div>
                  <label>Phone Number</label>
                  <input
                     type="number"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </div>
               <div>
                  <label>Address</label>
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </div>

               {/* Conditional rendering for job seekers to provide additional information */}
               {user && user.role === "Job Seeker" && (
                  <>
                     <div>
                        <label>Coverletter</label>
                        <textarea
                           value={coverLetter}
                           onChange={(e) => setCoverLetter(e.target.value)}
                           rows={10}
                        />
                     </div>
                     <div>
                        <label>Resume</label>
                        <input type="file" onChange={resumeHandler} />
                     </div>
                  </>
               )}

               {/* Apply button for authenticated job seekers */}
               {isAuthenticated && user.role === "Job Seeker" && (
                  <div style={{ alignItems: "flex-end" }}>
                     <button
                        className="btn"
                        onClick={handlePostApplication}
                        disabled={loading} // Disable button while loading
                     >
                        Apply
                     </button>
                  </div>
               )}
            </form>

            {/* Job details section */}
            <div className="job-details">
               <header>
                  <h3>{singleJob.title}</h3>
                  {/* Personal website link if available */}
                  {singleJob.personalWebsite && (
                     <Link target="_blank" to={singleJob.personalWebsite.url}>
                        {singleJob.personalWebsite.title}
                     </Link>
                  )}
                  <p>{singleJob.location}</p>
                  <p>Rs. {singleJob.salary} a month</p>
               </header>
               <hr />
               <section>
                  {/* Pay, job type, and location */}
                  <div className="wrapper">
                     <h3>Job details</h3>
                     <div>
                        <IoMdCash />
                        <div>
                           <span>Pay</span>
                           <span>{singleJob.salary} a month</span>
                        </div>
                     </div>
                     <div>
                        <FaToolbox />
                        <div>
                           <span>Job type</span>
                           <span>{singleJob.jobType}</span>
                        </div>
                     </div>
                  </div>
                  <hr />
                  <div className="wrapper">
                     <h3>Location</h3>
                     <div className="location-wrapper">
                        <FaLocationDot />
                        <span>{singleJob.location}</span>
                     </div>
                  </div>
                  <hr />
                  <div className="wrapper">
                     <h3>Full Job Description</h3>
                     <p>{singleJob.introduction}</p>
                     {singleJob.qualifications && (
                        <div>
                           <h4>Qualifications</h4>
                           <ul>
                              {qualifications.map((element) => {
                                 return (
                                    <li
                                       key={element}
                                       style={{ listStyle: "inside" }}
                                    >
                                       {element}
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     )}
                     {singleJob.responsibilities && (
                        <div>
                           <h4>Responsibilities</h4>
                           <ul>
                              {responsibilities.map((element) => {
                                 return (
                                    <li
                                       key={element}
                                       style={{ listStyle: "inside" }}
                                    >
                                       {element}
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     )}
                     {singleJob.offers && (
                        <div>
                           <h4>Offering</h4>
                           <ul>
                              {offering.map((element) => {
                                 return (
                                    <li
                                       key={element}
                                       style={{ listStyle: "inside" }}
                                    >
                                       {element}
                                    </li>
                                 );
                              })}
                           </ul>
                        </div>
                     )}
                  </div>
               </section>
               <hr />
               <footer>
                  <h3>Job Niche</h3>
                  <p>{singleJob.jobNiche}</p>
               </footer>
            </div>
         </article>
      </>
   );
};

export default PostApplication;
