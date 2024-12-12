import "./Dashboard.css"; // Importing styles for the dashboard
import React, { useEffect, useState } from "react"; // Importing React and necessary hooks
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { useNavigate } from "react-router-dom"; // Importing navigation hook from React Router
import { toast } from "react-toastify"; // Importing toast for notifications
import { logout, clearAllUserErrors } from "../../store/slices/userSlice"; // Importing actions for user authentication and error handling
import { LuMoveRight } from "react-icons/lu"; // Importing icon for sidebar toggle
import MyProfile from "../../components/MyProfile"; // Importing components for different sections of the dashboard
import UpdateProfile from "../../components/UpdateProfile";
import UpdatePassword from "../../components/UpdatePassword";
import MyJobs from "../../components/MyJobs";
import JobPost from "../../components/JobPost";
import Applications from "../../components/Applications";
import MyApplications from "../../components/MyApplications";

const Dashboard = () => {
   // State to manage sidebar visibility and selected component name
   const [show, setShow] = useState(false);
   const [componentName, setComponentName] = useState("My Profile");

   // Getting necessary data from the Redux store
   const { loading, isAuthenticated, error, user } = useSelector(
      (state) => state.user
   );

   const dispatch = useDispatch(); // Dispatch function to interact with Redux store
   const navigateTo = useNavigate(); // Navigate function to redirect the user

   // Handle logout and display success message
   const handleLogout = () => {
      dispatch(logout());
      toast.success("Logged out successfully.");
   };

   // Use effect to handle error and authentication checks
   useEffect(() => {
      if (error) {
         toast.error(error); // Show error if any
         dispatch(clearAllUserErrors()); // Clear errors after displaying
      }
      if (!isAuthenticated) {
         navigateTo("/"); // Redirect to home page if not authenticated
      }
   }, [dispatch, error, loading, isAuthenticated]);

   return (
      <>
         <section className="account">
            {/* Header section of the dashboard */}
            <div className="component_header">
               <p>Dashboard</p>
               <p>
                  Welcome! <span>{user && user.name}</span>
               </p>
            </div>
            <div className="container">
               {/* Sidebar for navigation */}
               <div className={show ? "sidebar showSidebar" : "sidebar"}>
                  <ul className="sidebar_links">
                     <h4>Manage Account</h4>
                     {/* Buttons for different sections */}
                     <li>
                        <button
                           onClick={() => {
                              setComponentName("My Profile");
                              setShow(!show); // Toggle sidebar visibility and change component
                           }}
                        >
                           My Profile
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => {
                              setComponentName("Update Profile");
                              setShow(!show);
                           }}
                        >
                           Update Profile
                        </button>
                     </li>
                     <li>
                        <button
                           onClick={() => {
                              setComponentName("Update Password");
                              setShow(!show);
                           }}
                        >
                           Update Password
                        </button>
                     </li>

                     {/* Render employer-specific options */}
                     {user && user.role === "Employer" && (
                        <>
                           <li>
                              <button
                                 onClick={() => {
                                    setComponentName("Job Post");
                                    setShow(!show);
                                 }}
                              >
                                 Post New Job
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => {
                                    setComponentName("My Jobs");
                                    setShow(!show);
                                 }}
                              >
                                 My Jobs
                              </button>
                           </li>
                           <li>
                              <button
                                 onClick={() => {
                                    setComponentName("Applications");
                                    setShow(!show);
                                 }}
                              >
                                 Applications
                              </button>
                           </li>
                        </>
                     )}

                     {/* Render job seeker-specific option */}
                     {user && user.role === "Job Seeker" && (
                        <li>
                           <button
                              onClick={() => {
                                 setComponentName("My Applications");
                                 setShow(!show);
                              }}
                           >
                              My Applications
                           </button>
                        </li>
                     )}
                     {/* Logout button */}
                     <li>
                        <button onClick={handleLogout}>Logout</button>
                     </li>
                  </ul>
               </div>

               {/* Banner section that displays the selected component */}
               <div className="banner">
                  {/* Sidebar toggle icon */}
                  <div
                     className={
                        show
                           ? "sidebar_icon move_right"
                           : "sidebar_icon move_left"
                     }
                  >
                     <LuMoveRight
                        onClick={() => setShow(!show)} // Toggle sidebar visibility on icon click
                        className={show ? "left_arrow" : "right_arrow"}
                     />
                  </div>

                  {/* Conditional rendering of the selected component */}
                  {(() => {
                     switch (componentName) {
                        case "My Profile":
                           return <MyProfile />;
                        case "Update Profile":
                           return <UpdateProfile />;
                        case "Update Password":
                           return <UpdatePassword />;
                        case "Job Post":
                           return <JobPost />;
                        case "My Jobs":
                           return <MyJobs />;
                        case "Applications":
                           return <Applications />;
                        case "My Applications":
                           return <MyApplications />;
                        default:
                           return <MyProfile />; // Default to My Profile if no component selected
                     }
                  })()}
               </div>
            </div>
         </section>
      </>
   );
};

export default Dashboard;
