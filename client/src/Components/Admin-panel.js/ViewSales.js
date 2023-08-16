import React, { useEffect, useState } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import Adminpanel from './Adminpanel';
import './Adminpanel.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewSales = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  useEffect(() => {
    const getOrders = async () => {
      const data = [];
      const querySnapshot = await getDocs(query(collection(db, 'Orders')));
      querySnapshot.forEach((doc) => {
        const order = doc.data();
        order.id = doc.id; // Assign the document ID to the "id" property of the order object
        data.push(order);
      });
      setOrders(data);
    };
    getOrders();
  }, []);

  const markAsShipped = async (orderId) => {
    const orderRef = doc(db, 'Orders', orderId);
    try {
      await updateDoc(orderRef, {
        ShippingStatus: 'Shipped',
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              ShippingStatus: 'Shipped',
            };
          }
          return order;
        })
      );
      toast.success('Order marked as Shipped successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error);
      alert('Error marking order as shipped');
    }
  };

  const markAsDelivered = async (orderId) => {
    const orderRef = doc(db, 'Orders', orderId);
    try {
      await updateDoc(orderRef, {
        ShippingStatus: 'Delivered',
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              ShippingStatus: 'Delivered',
            };
          }
          return order;
        })
      );
      toast.success('Order marked as delivered successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error(error);
      toast.error('Order Status Updated successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <Adminpanel />
      <ToastContainer />
      <div className="container mt-4">
        {orders.map((order) => (
          <div key={order.id} className="card0 mb-4">
            <div className="card-header bg-white text-black">
              <h4>Order #{order.id}</h4>
            </div>
            <div className="card-body8">
              <h5 className="card-title">{order.name}</h5>
              <p className="card-text"></p>
              <strong>Email:</strong> {order.email}

              <p className="card-text">
                <strong>Address:</strong> {order.address}, {order.city}, {order.state}
              </p>
              <p className="card-text">
                <strong>Total Amount:</strong> Pkr: {order.totalAmount}/=
              </p>
              <p className="card-text">
                <strong>Shipping Status:</strong> {order.ShippingStatus}
              </p>
              <button className="btn btn-success mr-2" onClick={() => markAsShipped(order.id)}>
                Mark as Shipped
              </button>
              <button className="btn btn-success mr-2" onClick={() => markAsDelivered(order.id)}>
                Mark as Delivered
              </button>
              {order.orderedItems.map((item) => (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.image} alt="Product" className="img-fluid" style={{ width: '100%' }} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h6 className="card-title">{item.name}</h6>
                        <p className="card-text">
                          <strong>Price:</strong> PKR {item.price}/=
                        </p>
                        <p className="card-text">
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSales;
