

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Adminpanel from './Adminpanel';
import { auth } from '../../firebase';
import { navigate, useNavigate } from 'react-router-dom';
import "./Adminpanel.css";

export const Contact = () => {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== 'umeraliusmani1@gmail.com') {
        alert('You do not have access to this page');
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getAllPayments = async () => {
    const data = [];
    const dataRetrieval = query(collection(db, "ContactUs"));

    const querySnapshot = await getDocs(dataRetrieval);
    querySnapshot.forEach((doc) => {
      const payment = doc.data();
      payment.id = doc.id;
      data.push(payment);
    });

    setItems(data);
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  const handleEmailButtonClick = (email) => {
    const encodedEmail = encodeURIComponent(email);
    window.location.href = `mailto:${encodedEmail}`;
  };
  

  return (
    <div>
      <Adminpanel />
      <div className="card10 mt-4">
        <div className="card-body">
          {items.map((contactus) => (
            <div key={contactus.id} className="card mb-4 p-4">
              <h5 className="card-title">Name: {contactus.name.toUpperCase()}</h5>
              <p className="card-text">Email: {contactus.email}</p>
              <p className="card-text">Contact No: {contactus.phoneno}</p>
              <p className="card-text">Subject: {contactus.subject}</p>
              <p className="card-text">Comment: {contactus.comments}</p>
              <button
                className="btnsendemail btn-primary"
                onClick={() => handleEmailButtonClick(contactus.email)}
              >
                Send Email
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
