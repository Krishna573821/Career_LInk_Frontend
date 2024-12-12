import "./Register.css" // Importing CSS for the register/login page
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importing hooks for dispatching actions and accessing Redux state
import { Link, useNavigate } from "react-router-dom"; // Importing React Router components for navigation
import { clearAllUserErrors, login } from "../../store/slices/userSlice"; // Importing actions from Redux slice
import { toast } from "react-toastify"; // Importing toast notification for error messages
import { FaRegUser } from "react-icons/fa"; // Importing icon for role selection
import { MdOutlineMailOutline } from "react-icons/md"; // Importing email icon
import { RiLock2Fill } from "react-icons/ri"; // Importing password icon

const Login = () => {
  const [role, setRole] = useState(""); // State for the selected role (Employer or Job Seeker)
  const [email, setEmail] = useState(""); // State for the email input
  const [password, setPassword] = useState(""); // State for the password input

  // Extracting loading, authentication status, and error from the Redux state
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch(); // Dispatch function for Redux actions
  const navigateTo = useNavigate(); // React Router's navigate function for redirection

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    const formData = new FormData();
    formData.append("role", role); // Adding role to form data
    formData.append("email", email); // Adding email to form data
    formData.append("password", password); // Adding password to form data
    dispatch(login(formData)); // Dispatching login action with form data
  };

  // Effect hook to handle side effects (error handling and redirection)
  useEffect(() => {
    if (error) {
      toast.error(error); // Displaying error toast if there's an error
      dispatch(clearAllUserErrors()); // Clearing error after displaying it
    }
    if (isAuthenticated) {
      navigateTo("/"); // Redirecting to home if user is authenticated
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h3>Login to your account</h3> {/* Heading for the login form */}
          </div>
          <form onSubmit={handleLogin}> {/* Form for user login */}
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option> {/* Default option */}
                  <option value="Employer">Login as an Employer</option> {/* Employer option */}
                  <option value="Job Seeker">Login as a Job Seeker</option> {/* Job Seeker option */}
                </select>
                <FaRegUser /> {/* Icon for role selection */}
              </div>
            </div>
            <div className="inputTag">
              <label>Email</label>
              <div>
                <input
                  type="email"
                  placeholder="youremail@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handling email input change
                />
                <MdOutlineMailOutline /> {/* Icon for email field */}
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Handling password input change
                />
                <RiLock2Fill /> {/* Icon for password field */}
              </div>
            </div>
            <button type="submit" disabled={loading}> {/* Submit button, disabled when loading */}
              Login
            </button>
            <Link to={"/register"}>Register Now</Link> {/* Link to the register page */}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
