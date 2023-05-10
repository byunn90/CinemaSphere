import { useState } from "react";
import "../public/Profile.css";
import { UPDATE_SUBSCRIPTION } from "../utils/mutations";
import { DELETE_SUBSCRIPTION } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const Profile = () => {
  const [showUpdateSubscription, setShowUpdateSubscription] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const username = data?.me?.username;
  const email = data?.me?.email;
  const subscription = data?.me?.subscription?.type;
  console.log(subscription);

  return (
    <>
      <div className="profile-container">
        <div className="profile-header">
          <h1>{username} Profile</h1>
        </div>
        <div className="profile-body">
          <div className="profile-section">
            <h2>Account Information</h2>
            <ul>
              <li>Name: {username}</li>
              <li>Email: {email}</li>
              <li>Subscription: {subscription}</li>
              <li>Payment Method: Visa **** 1234</li>
            </ul>
            <button onClick={() => setShowUpdateSubscription(true)}>
              Update Subscription & Profile
            </button>
          </div>
        </div>
      </div>
      {showUpdateSubscription && (
        <div className="update-subscription">
          <h2>Update Subscription</h2>
          <p>Choose a plan:</p>
          <ul>
            <li>
              <input
                type="radio"
                id="basic"
                name="subscription"
                value="basic"
              />
              <label htmlFor="basic">Basic - $8.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="standard"
                name="subscription"
                value="standard"
              />
              <label htmlFor="standard">Standard - $12.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="premium"
                name="subscription"
                value="premium"
              />
              <label htmlFor="premium">Premium - $15.99/month</label>
            </li>
          </ul>
          <button>Update Subscription</button>
          <button onClick={() => setShowUpdateSubscription(false)}>
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
