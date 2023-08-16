import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import "./editprofile.css";
// import Navbar from "../Navigation/Navbar";


const EditProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user) {
      const userId = user.uid;
      const newDetails = { displayName, name, email };
      updateUserDetails(userId, newDetails);
      if (newPassword !== "" && currentPassword !== "") {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        try {
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          console.log(`Successfully updated password for user: ${userId}`);
        } catch (error) {
          console.error(`Error updating password for user: ${userId}`, error);
        }
      }
    }
  };

  async function updateUserDetails(userId, newDetails) {
    try {
      const userRef = db.collection("users").doc(userId);
      if (newDetails.newPassword) {
        await userRef.update({
          password: newDetails.newPassword,
        });
      }
      const { newPassword, ...otherDetails } = newDetails;
      await userRef.update(otherDetails);
      console.log(`Successfully updated user: ${userId}`);
    } catch (error) {
      console.error(`Error updating user: ${userId}`, error);
    }
  }

  return (
    <div>
      {/* <Navbar/> */}
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="currentPassword" className="form-label">
          Current Password:
        </label>
        <input
          type="password"
          id="currentPassword"
          className="form-control"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Profile
      </button>
    </form>
    </div>
  );
};

export default EditProfile;
