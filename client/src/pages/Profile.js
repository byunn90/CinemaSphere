import { useState } from "react";
import "../public/Profile.css";
import { GET_ME } from "../utils/queries";
import {
  DELETE_SUBSCRIPTION_BY_TYPE,
  UPDATE_SUBSCRIPTION,
} from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const Profile = () => {
  const [deleteSubscriptionByType, { error: deleteError }] = useMutation(
    DELETE_SUBSCRIPTION_BY_TYPE
  ); // Update the mutation name
  const [showUpdateSubscription, setShowUpdateSubscription] = useState(false);
  const { loading, data } = useQuery(GET_ME);
  const username = data?.me?.username;
  const email = data?.me?.email;
  const subscription = data?.me?.subscription?.type;
  console.log(subscription);
  const [selectedType, setSelectedType] = useState("");

  const handleDeleteSubscription = () => {
    deleteSubscriptionByType({
      variables: {
        type: subscription,
      },
      refetchQueries: [{ query: GET_ME }],
    })
      .then(() => {
        alert("Subscription deleted");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [updateSubscription, { error: updateError }] =
    useMutation(UPDATE_SUBSCRIPTION);

  const handleUpdateSubscription = () => {
    console.log("UPDATE ME");
    if (selectedType) {
      updateSubscription({
        variables: {
          subscriptionId: data.me.subscription._id,
          type: selectedType,
        },
        refetchQueries: [{ query: GET_ME }],
      })
        .then(() => {
          alert("Subscription updated");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading state
  }

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
                id="BASIC"
                name="subscription"
                value="basic"
              />
              <label htmlFor="basic">BASIC - $8.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="STANDARD"
                name="subscription"
                value="standard"
              />
              <label htmlFor="standard">STANDARD - $12.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="PREMIUM"
                name="subscription"
                value="premium"
              />
              <label htmlFor="premium">PREMIUM - $15.99/month</label>
            </li>
          </ul>
          <button onClick={handleUpdateSubscription}>
            Update Subscription
          </button>

          <button onClick={() => setShowUpdateSubscription(false)}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete your subscription?"
                )
              ) {
                handleDeleteSubscription();
              }
            }}
          >
            Delete Subscription
          </button>
        </div>
      )}
    </>
  );
};

export default Profile;
