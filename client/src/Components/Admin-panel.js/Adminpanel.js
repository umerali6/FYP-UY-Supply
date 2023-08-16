import React, { useEffect } from 'react';
import { navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { NavLink} from "react-router-dom";
import "./Adminpanel.css"


//  if (!user || (user.email !== 'umeraliusmani1@gmail.com' && user.email !== 'csgoaccseller0@gmail.com')) {

// This updated code will check if the user's email is either "umeraliusmani1@gmail.com" or "csgoaccseller0@gmail.com". If it is not, the user will be redirected to the homepage and an alert will be displayed.
const Adminpanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // checking email
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== 'umeraliusmani1@gmail.com' ) {
        alert('You do not have access to this page');
        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  },);

  const signOutClick = () => {
    auth.signOut();
    navigate("/login");
  };


  return (
    <>
      
      <div className="container">
        <div className="header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="menu">
          <ul>
            <NavLink to="/product" className="navbar-brand">
              List Product
            </NavLink>
            <NavLink to="/Orders" className="navbar-brand">
              View Orders
            </NavLink>
            <NavLink to="/ProductListed" className="navbar-brand">
              View Listed Products
            </NavLink>
            <NavLink to="/Payment" className="navbar-brand">
              Payment
            </NavLink>
            <NavLink to="/AdminContact" className="navbar-brand">
             Contact Queries
            </NavLink>
            <NavLink to="/Manange-Reviews" className="navbar-brand">
             Manage Testimonial
            </NavLink>
          </ul>
          <button
                  onClick={() => {
                    localStorage.clear();
                    signOutClick();
                  }}
                  className="btn123">
                  Signout
                </button>
        </div>
        
        </div>
        {/* <div className="footer">
          <p>&copy; 2023 Uy-Supply Store. All Rights Reserved.</p>
        </div> */}
     
    </>
  );
};

export default Adminpanel;
