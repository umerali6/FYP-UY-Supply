import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { paymentSchema } from "../../utils";
import Navbar from "../../Components/Navigation/Navbar";
import CardInput from "../../Components/Card/CardInput";
import axios from "axios";
import "./checkout.css";
import { cartActions } from "../../store/cartSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { doc, updateDoc ,deleteDoc ,getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from "uuid";
import { useState ,useEffect } from "react";


const CheckoutForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  
  const [invoiceNo, setInvoiceNo] = useState("");

  
  const auth = getAuth();
  const user = auth.currentUser;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const orderedItems = useSelector((state) => state.cart.cartItems);

  const initialValues = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
  
      // handle api request here
      const response = await axios.post("http://localhost:5000/pay", { ...values, totalAmount });
  
      if (!response || !response.data) {
        throw new Error("Invalid API response");
      }
  
      const clientSecret = response.data["client_secret"];
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: values.city,
              state: values.state,
              line1: values.address,
              line2: null,
            },
            email: values.email,
            name: values.name,
          },
        },
      });
  
      console.log(result);
      console.log(orderedItems);
  
      if (result.paymentIntent.status === "succeeded") {
        // Payment successful!
        alert("Payment successful!");
        dispatch(cartActions.reset());
        const randomInvoiceNo = uuidv4(); // Generate random UUID as the invoice number
        setInvoiceNo(randomInvoiceNo);
        // Add the order to the Orders collection
        const docRef = await addDoc(collection(db, "Orders"), {
          invoiceNo: randomInvoiceNo,
          name: values.name,
          email: values.email,
          address: values.address,
          city: values.city,
          state: values.state,
          totalAmount: totalAmount,
          orderedItems: orderedItems,
          date: new Date(),
          userId: user.uid,
          ShippingStatus: "Received",
        });
        setTimeout(() => navigate("/receipt/${randomInvoiceNo}"), 3000);
        // Decrement the quantity of all the products that are added to cart from checkout
        orderedItems.forEach(async (item) => {
          const productRef = doc(db, "Products", item.id);
          const productSnapshot = await getDoc(productRef);
          const productData = productSnapshot.data();
          const updatedQuantity = productData.quantity - item.quantity;
          if (updatedQuantity <= 0) {
            // Remove the product from the Products collection
            await deleteDoc(productRef);
          } else {
            // Update the product quantity
            await updateDoc(productRef, {
              quantity: updatedQuantity,
            });
          }
        });
  
        // Generate receipt

        const cardLastFourDigits = result.paymentIntent.payment_method_details
  ? result.paymentIntent.payment_method_details.card?.last4 || ''
  : '';

        const receiptDocRef = await addDoc(collection(db, "Payment"), {
          Name: values.name,
          Email: values.email,
          Address: values.address,
          City: values.city,
          State: values.state,
          TotalAmount: totalAmount,
          OrderedItems: orderedItems,
          PaymentStatus: "unpaid",
          CardLastFourDigits: cardLastFourDigits,
          Date: new Date(),
        });
  
        console.log("Your Receipt has been Generated");
      }
      resetForm();
      setSubmitting(false);
    } catch (e) {
      console.error(e.message);
      alert("Payment failed. Please try again.");
      setSubmitting(false);
    }
  };
  
  
  

  return (
    <>
      <Navbar />
      <div className="payment-form-container">
        <h2>Payment Information</h2>
        <div className="total-cost">Total Cost: Pkr {totalAmount}/=</div>
        <Formik
          initialValues={initialValues}
          validationSchema={paymentSchema}
          onSubmit={handleSubmit}>
          {(formik) => (
            <Form className="payment-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <div className="form-control stripe-field">
                  <CardInput />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <Field type="text" name="address" className="form-control" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <Field type="text" name="city" className="form-control" />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <Field type="text" name="state" className="form-control" />
                <ErrorMessage name="state" component="div" className="error" />
              </div>
              <button type="submit" className="submit-form">
                Proceed to Pay
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CheckoutForm;


