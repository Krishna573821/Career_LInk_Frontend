import React from "react"; // Importing React
import { useSelector } from "react-redux"; // Importing useSelector to access Redux state

const MyProfile = () => {
  // Extracting user data from the Redux state
  const { user } = useSelector((state) => state.user);

  return (
    <div className="account_components">
      <h3>My Profile</h3>
      {/* Displaying user's full name */}
      <div>
        <label>Full Name</label>
        <input
          type="text"
          disabled // Making input field read-only
          value={user && user.name} // Displaying user's name from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
      {/* Displaying user's email */}
      <div>
        <label>Email Address</label>
        <input
          type="email"
          disabled // Making input field read-only
          value={user && user.email} // Displaying user's email from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
      {/* Conditionally rendering preferred job niches for Job Seeker */}
      {user && user.role === "Job Seeker" && (
        <div>
          <label>My Preferred Job Niches</label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {/* Displaying first preferred niche */}
            <input
              type="text"
              disabled // Making input field read-only
              value={user && user.niches.firstNiche} // Displaying first niche
              onChange={(e) => e.target.value} // Preventing any changes
            />
            {/* Displaying second preferred niche */}
            <input
              type="text"
              disabled // Making input field read-only
              value={user && user.niches.secondNiche} // Displaying second niche
              onChange={(e) => e.target.value} // Preventing any changes
            />
            {/* Displaying third preferred niche */}
            <input
              type="text"
              disabled // Making input field read-only
              value={user && user.niches.thirdNiche} // Displaying third niche
              onChange={(e) => e.target.value} // Preventing any changes
            />
          </div>
        </div>
      )}
      {/* Displaying user's phone number */}
      <div>
        <label>Phone Number</label>
        <input
          type="number"
          disabled // Making input field read-only
          value={user && user.phone} // Displaying user's phone from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
      {/* Displaying user's address */}
      <div>
        <label>Address</label>
        <input
          type="text"
          disabled // Making input field read-only
          value={user && user.address} // Displaying user's address from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
      {/* Displaying user's role */}
      <div>
        <label>Role</label>
        <input
          type="text"
          disabled // Making input field read-only
          value={user && user.role} // Displaying user's role from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
      {/* Displaying user's account creation date */}
      <div>
        <label>Joined On</label>
        <input
          type="text"
          disabled // Making input field read-only
          value={user && user.createdAt} // Displaying account creation date from state
          onChange={(e) => e.target.value} // Preventing any changes
        />
      </div>
    </div>
  );
};

export default MyProfile;
