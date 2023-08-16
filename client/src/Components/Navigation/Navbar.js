import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./navbar.css"


const Navbar = () => {
  const navigate = useNavigate();
  const totalItems = useSelector((state) => state.cart.cartItems);
  const [user, loading, error] = useAuthState(auth);

  const signOutClick = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
     <nav className="navbar navbar-expand-lg">


        <div className="container-fluid ">
          {/* <NavLink to="/" className="navbar-brand">
            UY Supply Stores
          </NavLink> */}
          <NavLink to="/" className="image-logo">
                  <img src="./Images/logo12.png" alt="cart" />
                  
                </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
            <NavLink to="/orderhistory" className="nav-link">
                View orders
              </NavLink>


              <NavLink to="/atest" className="nav-link">
                Leave a Review
              </NavLink>

              <NavLink to="/testimonial" className="nav-link">
                Reviews
              </NavLink>
              
              <NavLink to="/ContactUs" className="nav-link">
                ContactUs
              </NavLink>

              <NavLink to="/about" className="nav-link">
                About Us
              </NavLink>

              <NavLink to="/FAQ" className="nav-link">
                FAQ
              </NavLink>


              <li className="nav-item1 " style={{ display: "flex" }}>
                <a className="nav-link " aria-current="page">
                  {user?.displayName ? user.displayName : user?.email}         
                  {/* {user?.displayName }          */}

                </a>
                <div className="cartlogo " id="navbarSupportedContent">
                <NavLink to="/cart1" className=" nabar nav-link">
                  <img src="./images/cart.png" alt="cart" />
                  <p>{totalItems.length}</p>
                </NavLink>
                </div>
                {/* <a className="nav-link " aria-current="page" href="/">
                  <img src="./images/favourite.png" alt="cart" />
                </a> */}

                   
              {user?.email === "umeraliusmani1@gmail.com" && (
                <NavLink to="/dashboard" className="nav-link">
                  Admin Dashboard
                </NavLink>
              )}
                <NavLink to="/a" className="nav-link">
                  Edit Profile
                </NavLink>

             

                <button
                  onClick={() => {
                    localStorage.clear();
                    signOutClick();
                  }}
                  className="btn123">
                  Signout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
