

import { Routes, Route } from "react-router-dom";

// Navigation
import Navbar from "./Components/Navigation/Navbar";

// Pages
import Checkout from "./pages/Checkout/Checkout";
import HomeFinal from "./pages/Home/HomeFinal";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AboutUs from "./pages/About-Us/AboutUs";
import ForgotPassword from "./pages/Forgot-Password/ForgotPassword";
import ProductPage from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import EditProfile from "./Components/Profile/EditProfile";
import Items from "./Components/Products/Product-Item/Items";
import AddProducts from "./Components/Products/Add-Product/AddProducts";
import Testimonial from "./Components/Rating/Testimonial";
import AddTestimonial from "./Components/Rating/AddTestimonial";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import AdminPanel from "./Components/Admin-panel.js/Adminpanel";
import ViewSales from "./Components/Admin-panel.js/ViewSales";
import { ViewProduct } from "./Components/Admin-panel.js/ViewProduct";
import ViewPayment from "./Components/Admin-panel.js/ViewPayment";
import { ContactUs } from "./Components/ContactUs/ContactUs";
import { Contact } from "./Components/Admin-panel.js/Contact";
import { Faq } from "./pages/FAQ's/Faq";
import { Receipt } from "./pages/Checkout-Receipt/Receipt";
import { ViewReviews } from "./Components/Admin-panel.js/ViewReviews";
// import Recommendations from "./Recommendation/Recommendation";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <>
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" exact element={<HomeFinal />} />
        <Route path="/" exact element={<Navbar />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Items />} />
        <Route path="/product" exact element={<AddProducts />} />
        <Route path="/About" exact element={<AboutUs />} />
        <Route path="/forgotpassword" exact element={<ForgotPassword />} />
        <Route path="/cart1" exact element={<Cart />} />
        <Route path="/testimonial" exact element={<Testimonial />} />
        <Route path="/atest" exact element={<AddTestimonial />} />
        <Route path="/a" exact element={<EditProfile />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/FAQ" element={<Faq />} />
        <Route path="/dashboard" element={<AdminPanel />} />
        <Route path="/Orders" element={<ViewSales />} />
        <Route path="/ProductListed" element={<ViewProduct />} />
        <Route path="/Payment" element={<ViewPayment />} />
        {/* <Route path="/Payment" element={<Recommendations />} /> */}
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AdminContact" element={<Contact />} />
        <Route path="/Manange-Reviews" element={<ViewReviews />} />
        <Route path="/receipt/:randomInvoiceNo" element={<Receipt />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you're looking for does not exist. Please check the URL or navigate to a different page.</p>
    </div>
  );
}
export default App;