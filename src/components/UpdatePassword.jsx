import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook (not used in this case)
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice"; // Importing actions for updating password and clearing errors
import { getUser } from "../store/slices/userSlice"; // Importing action for getting user details
import { FaRegEyeSlash, FaEye } from "react-icons/fa"; // Importing icons for showing/hiding password
import { toast } from "react-toastify"; // Importing toast notifications

const UpdatePassword = () => {
  // State to manage password fields and visibility of password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Extracting relevant state values from the Redux store
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch(); // Getting dispatch function from Redux

  // Function to handle password update when the form is submitted
  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword); // Append old password to form data
    formData.append("newPassword", newPassword); // Append new password to form data
    formData.append("confirmPassword", confirmPassword); // Append confirm password to form data
    dispatch(updatePassword(formData)); // Dispatch the action to update the password
  };

  // Handling side effects when error or success state changes
  useEffect(() => {
    if (error) {
      toast.error(error); // Display error notification
      dispatch(clearAllUpdateProfileErrors()); // Clear errors from the state
    }
    if (isUpdated) {
      toast.success("Password Updated"); // Display success notification
      dispatch(getUser()); // Fetch updated user details
      dispatch(clearAllUpdateProfileErrors()); // Clear errors after successful update
    }
  }, [dispatch, loading, error, isUpdated]); // Effect runs on changes to error, isUpdated, and loading

  return (
    <div className="account_components update_password_component">
      <h3>Update Password</h3>
      {/* Input for current password */}
      <div>
        <label>Current Password</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)} // Update oldPassword state
        />
        {/* Show/hide password icon */}
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        )}
      </div>
      {/* Input for new password */}
      <div>
        <label>New Password</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Update newPassword state
        />
        {/* Show/hide password icon */}
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        )}
      </div>
      {/* Input for confirming new password */}
      <div>
        <label>Confirm Password</label>
        <input
          type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
        />
        {/* Show/hide password icon */}
        {showPassword ? (
          <FaRegEyeSlash
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        ) : (
          <FaEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          />
        )}
      </div>
      {/* Button to submit the password update */}
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdatePassword} // Trigger password update
          disabled={loading} // Disable button while loading
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
