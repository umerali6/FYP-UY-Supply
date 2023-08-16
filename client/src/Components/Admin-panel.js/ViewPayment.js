import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Adminpanel from './Adminpanel';
import { auth } from '../../firebase';
import { navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Adminpanel.css";

const ViewPayment = () => {
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

  const getAllProducts = async () => {
    const data = [];
    const dataRetrieval = query(collection(db, "Orders"));

    const querySnapshot = await getDocs(dataRetrieval);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      data.push(product);
    });

    setItems(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllPayments = async () => {
    const data = [];
    const dataRetrieval = query(collection(db, "Payment"));

    const querySnapshot = await getDocs(dataRetrieval);
    querySnapshot.forEach((doc) => {
      const payment = doc.data();
      payment.id = doc.id;
      console.log(payment); // Add this line to log the payment object

      // Fetch the last 4 digits of the credit card number
      const creditCardLast4Digits = payment.creditCard?.last4Digits || '';

      if (payment.orderedItems) {
        payment.orderedItems = payment.orderedItems.map((item) => JSON.parse(item));
      }
      data.push({ ...payment, creditCardLast4Digits });
    });

    setItems(data);
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  const updatePaymentStatus = async (paymentId) => {
    const paymentRef = doc(db, "Payment", paymentId);

    try {
      await updateDoc(paymentRef, {
        PaymentStatus: "Paid"
      });
      // Update the payment status in the local state
      setItems((prevItems) =>
        prevItems.map((payment) => {
          if (payment.id === paymentId) {
            return { ...payment, PaymentStatus: "Paid" };
          }
          return payment;
        })
      );
      // toast.success("Payment status updated successfully!");
      toast.success("Payment status updated successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    }
  };

  const updatePaymentStatus2 = async (paymentId) => {
    const paymentRef = doc(db, "Payment", paymentId);

    try {
      await updateDoc(paymentRef, {
        PaymentStatus: "unpaid"
      });
      // Update the payment status in the local state
      setItems((prevItems) =>
        prevItems.map((payment) => {
          if (payment.id === paymentId) {
            return { ...payment, PaymentStatus: "unpaid" };
          }
          return payment;
        })
      );
      // toast.success("Payment status updated successfully!");
      toast.success("Payment status updated successfully!", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    }
  };

  const formatAmount = (totalAmount) => {
    return totalAmount.toLocaleString("en-PK");
  };

  return (
    <div>
      <Adminpanel />
      <ToastContainer />
      <div className="card8 mt-4">
        <div className="card-body">
          {items.map((payment) => (
            <div key={payment.id} className="card mb-4 p-4">
              <h5 className="card-title">{payment.Name}</h5>
              {/* <p className="card-text">Last 4 Digits: {payment.CardLastFourDigits}</p> */}
              <p className="card-text">Email: {payment.Email}</p>
              {/* <p className="card-text">Date: {payment.Date}</p> */}
              <p className="card-text">Address: {payment.Address}</p>
              <p className="card-text">City: {payment.City}</p>
              <p className="card-text">State: {payment.State}</p>
              <p className="card-text">TotalAmount: Pkr {payment.TotalAmount}/=</p>
              {/* <p className="card-text">OrderedItems: {JSON.parse(payment.OrderedItems).map(item => `${item.name} (${item.quantity})`).join(", ")}</p> */}
              <p
                className={`card-text font-weight-bold ${
                  payment.PaymentStatus === "Paid" ? "text-success" : "text-danger"
                }`}
              >
                PaymentStatus: {payment.PaymentStatus}
              </p>

              {payment.PaymentStatus === "unpaid" && (
                <button className="btn67 btn-primary mr-2" onClick={() => updatePaymentStatus(payment.id)}>
                  Mark as Paid
                </button>
              )}
              {payment.orderedItems &&
                payment.orderedItems.map((item) => (
                  <div key={item.id}>
                    <h6 className="card-subtitle mb-2 text-muted">{item.name}</h6>
                    <b>
                      <p className="card-text">Price: Pkr {formatAmount(item.price)}/-</p>
                    </b>
                    <p className="card-text">
                      <strong> Quantity: </strong> {item.quantity}
                    </p>

                    <div className="img1">
                      <img src={item.image} className="card-img-top" alt={item.name} />
                    </div>
                  </div>
                ))}

              {payment.PaymentStatus === "Paid" && (
                <button className="btn btn-danger mr-2" onClick={() => updatePaymentStatus2(payment.id)}>
                  Mark as UnPaid
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
