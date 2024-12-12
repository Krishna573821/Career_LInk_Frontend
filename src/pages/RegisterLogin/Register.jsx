import "./Register.css"; // Importing CSS file for styling
import React, { useEffect, useState } from "react"; // Importing React and hooks
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import { Link, useNavigate } from "react-router-dom"; // Importing routing components
import { clearAllUserErrors, register } from "../../store/slices/userSlice"; // Importing Redux actions
import { toast } from "react-toastify"; // Importing toast for notifications
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa"; // Importing icons for the form
import { FaPhoneFlip } from "react-icons/fa6"; // Importing phone icon
import { MdCategory, MdOutlineMailOutline } from "react-icons/md"; // Importing category and mail icons
import { RiLock2Fill } from "react-icons/ri"; // Importing lock icon for password

const Register = () => {
   // State variables for form input fields
   const [role, setRole] = useState(""); // Role (Employer/Job Seeker)
   const [name, setName] = useState(""); // Name input
   const [email, setEmail] = useState(""); // Email input
   const [phone, setPhone] = useState(""); // Phone number input
   const [address, setAddress] = useState(""); // Address input
   const [password, setPassword] = useState(""); // Password input
   const [firstNiche, setFirstNiche] = useState(""); // First niche for job seekers
   const [secondNiche, setSecondNiche] = useState(""); // Second niche for job seekers
   const [thirdNiche, setThirdNiche] = useState(""); // Third niche for job seekers
   const [coverLetter, setCoverLetter] = useState(""); // Cover letter input for job seekers
   const [resume, setResume] = useState(""); // Resume file input for job seekers

   // Array of available niches for job seekers
   const nichesArray = [
      "Software Development",
      "Web Development",
      "Cybersecurity",
      "Data Science",
      "Artificial Intelligence",
      "Cloud Computing",
      "DevOps",
      "Mobile App Development",
      "Blockchain",
      "Database Administration",
      "Network Administration",
      "UI/UX Design",
      "Game Development",
      "IoT (Internet of Things)",
      "Big Data",
      "Machine Learning",
      "IT Project Management",
      "IT Support and Helpdesk",
      "Systems Administration",
      "IT Consulting",
   ];

   // Function to handle resume file input
   const resumeHandler = (e) => {
      const file = e.target.files[0];
      setResume(file); // Set resume file in state
   };

   // Extracting necessary data from Redux state
   const { loading, isAuthenticated, error, message } = useSelector(
      (state) => state.user // Select user state from Redux store
   );

   const dispatch = useDispatch(); // Redux dispatch function
   const navigateTo = useNavigate(); // Hook to navigate between routes

   // Function to handle form submission
   const handleRegsiter = (e) => {
      e.preventDefault(); // Prevent default form submission
      const formData = new FormData(); // Create a new FormData object to handle file uploads

      // Append form data to FormData object
      formData.append("role", role);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("password", password);

      // Additional form data for job seekers
      if (role === "Job Seeker") {
         formData.append("firstNiche", firstNiche);
         formData.append("secondNiche", secondNiche);
         formData.append("thirdNiche", thirdNiche);
         formData.append("coverLetter", coverLetter);
         formData.append("resume", resume);
      }

      dispatch(register(formData)); // Dispatch the register action with the form data
   };

   // useEffect hook to handle error messages and redirection
   useEffect(() => {
      if (error) {
         toast.error(error); // Show error toast if there's an error
         dispatch(clearAllUserErrors()); // Clear errors from Redux store
      }
      if (isAuthenticated) {
         navigateTo("/"); // Redirect to home page if authenticated
      }
   }, [dispatch, error, loading, isAuthenticated, message]); // Dependencies for useEffect

   return (
      <>
         <section className="authPage">
            <div className="container">
               <div className="header">
                  <h3>Create a new account</h3>
               </div>
               <form onSubmit={handleRegsiter}>
                  <div className="wrapper">
                     <div className="inputTag">
                        <label>Register As</label>
                        <div>
                           <select
                              value={role}
                              onChange={(e) => setRole(e.target.value)} // Update role when selected
                           >
                              <option value="">Select Role</option>
                              <option value="Employer">
                                 Register as an Employer
                              </option>
                              <option value="Job Seeker">
                                 Register as a Job Seeker
                              </option>
                           </select>
                           <FaRegUser />
                        </div>
                     </div>
                     <div className="inputTag">
                        <label>Name</label>
                        <div>
                           <input
                              type="text"
                              placeholder="Your Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)} // Update name
                           />
                           <FaPencilAlt />
                        </div>
                     </div>
                  </div>
                  <div className="wrapper">
                     <div className="inputTag">
                        <label>Email Address</label>
                        <div>
                           <input
                              type="email"
                              placeholder="youremail@gmail.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)} // Update email
                           />
                           <MdOutlineMailOutline />
                        </div>
                     </div>
                     <div className="inputTag">
                        <label>Phone Number</label>
                        <div>
                           <input
                              type="number"
                              placeholder="111-222-333"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)} // Update phone number
                           />
                           <FaPhoneFlip />
                        </div>
                     </div>
                  </div>
                  <div className="wrapper">
                     <div className="inputTag">
                        <label>Address</label>
                        <div>
                           <input
                              type="text"
                              placeholder="Your Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)} // Update address
                           />
                           <FaAddressBook />
                        </div>
                     </div>
                     <div className="inputTag">
                        <label>Password</label>
                        <div>
                           <input
                              type="password"
                              placeholder="Your Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)} // Update password
                           />
                           <RiLock2Fill />
                        </div>
                     </div>
                  </div>
                  {role === "Job Seeker" && (
              <>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Your First Niche</label>
                    <div>
                      <select
                        value={firstNiche}
                        onChange={(e) => setFirstNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Second Niche</label>
                    <div>
                      <select
                        value={secondNiche}
                        onChange={(e) => setSecondNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Third Niche</label>
                    <div>
                      <select
                        value={thirdNiche}
                        onChange={(e) => setThirdNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Coverletter</label>
                    <div>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={10}
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Resume</label>
                    <div>
                      <input
                        type="file"
                        onChange={resumeHandler}
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
                  <button type="submit" disabled={loading}>
                     Register
                  </button>
                  <Link to={"/login"}>Login Now</Link> 
               </form>
            </div>
         </section>
      </>
   );
};

export default Register;
