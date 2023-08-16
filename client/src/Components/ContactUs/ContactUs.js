
import React from 'react';
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Components/Navigation/Navbar";
import "react-toastify/dist/ReactToastify.css";
import "./contactus.css"

export const ContactUs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState(null);
  const [comments, setComments] = useState("");
  const [subject, setSubject] = useState("");
 

  const handleContactUs = (e) => {
    e.preventDefault();
    const docRef = addDoc(collection(db, "ContactUs"), {
      name,
      phoneno: Number(phoneno),
      email,
      comments,
      subject,
      date: new Date(),
    });
    // Display success toast message
    toast.success("Details sent successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    // Wait for a few seconds before navigating to '/'
    setTimeout(() => navigate("/"), 3000);
  }

  return (
    <div>
      <Navbar />
      <div className="landing3">
        <div className="container2 py-5 ">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <br />
              <br />
              <h1>Contact Us</h1>
              <hr />
              <ToastContainer />
              <form
                autoComplete="off"
                className="form-group"
                onSubmit={handleContactUs}
              >
                <br />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneno" className="form-label">Contact Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneno"
                    required
                    onChange={(e) => setPhoneno(e.target.value)}
                    value={phoneno}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    required
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">Comments</label>
                  <input
                    type="text"
                    className="form-control"
                    id="comments"
                    required
                    onChange={(e) => setComments(e.target.value)}
                    value={comments}
                    />
</div>
<div style={{ display: "flex", justifyContent: "flex-end" }}>
<button type="submit" className="btn btn-dark btn-md">
SUBMIT
</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
);
}
