import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  // Accessing user data and profile update state from Redux store
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // State variables for managing form inputs
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [address, setAddress] = useState(user && user.address);
  const [coverLetter, setCoverLetter] = useState(user && user.coverLetter);
  const [firstNiche, setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche, setSecondNiche] = useState(
    user && user.niches?.secondNiche
  );
  const [thirdNiche, setThirdNiche] = useState(user && user.niches?.thirdNiche);
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user && user.resume?.url);

  // Handle profile update submission
  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);

    // Adding job seeker-specific fields
    if (user && user.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }

    // If a resume file is provided, append it to the form data
    if (resume) {
      formData.append("resume", resume);
    }
    // Dispatching the updateProfile action to update the profile in the backend
    dispatch(updateProfile(formData));
  };

  // useEffect hook to handle side effects like showing errors and success messages
  useEffect(() => {
    if (error) {
      toast.error(error); // Display error message if any
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated."); // Display success message when the profile is updated
      dispatch(getUser()); // Fetch updated user data from backend
      dispatch(clearAllUpdateProfileErrors()); // Clear errors
    }
  }, [dispatch, loading, error, isUpdated, user]);

  // Handle resume file selection and preview
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file); // Store the selected resume file in state
    };
  };

  // List of available job niches for the user to select from
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

  return (
    <div className="account_components">
      <h3>Update Profile</h3>
      {/* User input fields for profile information */}
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Updating name state on change
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updating email state on change
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // Updating phone state on change
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Updating address state on change
        />
      </div>

      {/* Conditional rendering for job seeker specific fields */}
      {user && user.role === "Job Seeker" && (
        <>
          <div>
            <label>My Preferred Job Niches</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {/* Dropdowns for selecting job niches */}
              <select
                value={firstNiche}
                onChange={(e) => setFirstNiche(e.target.value)} // Updating first niche state
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={secondNiche}
                onChange={(e) => setSecondNiche(e.target.value)} // Updating second niche state
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={thirdNiche}
                onChange={(e) => setThirdNiche(e.target.value)} // Updating third niche state
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label>Coverletter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)} // Updating cover letter state
              rows={5}
            />
          </div>
          <div>
            <label>Upload Resume</label>
            <input type="file" onChange={resumeHandler} /> {/* Handle resume file upload */}
            {/* Display current resume if available */}
            {user && user.resume && (
              <div>
                <p>Current Resume:</p>
                <Link
                  to={user.resume && user.resume.url}
                  target="_blank"
                  className="view-resume"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      {/* Button to save changes */}
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdateProfile} // Trigger profile update on click
          disabled={loading} // Disable button while loading
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
