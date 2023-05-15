import { useState } from "react";
import "../public/Profile.css";
import { GET_ME } from "../utils/queries";
import {
  DELETE_SUBSCRIPTION_BY_TYPE,
  UPDATE_SUBSCRIPTION,
} from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deleteSubscriptionByType, { error: deleteError }] = useMutation(
    DELETE_SUBSCRIPTION_BY_TYPE
  );
  const [showUpdateSubscription, setShowUpdateSubscription] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const userId = data?.me?._id;
  const username = data?.me?.username;
  const email = data?.me?.email;
  const subscription = data?.me?.subscription?.type;
  console.log(selectedType);
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
    if (selectedType && userId) {
      updateSubscription({
        variables: {
          userId: userId,
          type: selectedType,
          paymentStatus: "PAID",
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

  const handleRadioChange = (event) => {
    const subscriptionType = event.target.value;

    let type = "";
    if (subscriptionType === "basic") {
      type = "BASIC";
    } else if (subscriptionType === "standard") {
      type = "STANDARD";
    } else if (subscriptionType === "premium") {
      type = "PREMIUM";
    }

    setSelectedType(type);
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
              <li>Subscription: {setSelectedType}</li>
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
                checked={selectedType === "BASIC"}
                value="basic"
                onChange={handleRadioChange}
              />
              <label htmlFor="basic">BASIC - $8.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="STANDARD"
                name="subscription"
                checked={selectedType === "STANDARD"}
                value="standard"
                onChange={handleRadioChange}
              />
              <label htmlFor="standard">STANDARD - $12.99/month</label>
            </li>
            <li>
              <input
                type="radio"
                id="PREMIUM"
                name="subscription"
                checked={selectedType === "PREMIUM"}
                value="premium"
                onChange={handleRadioChange}
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
