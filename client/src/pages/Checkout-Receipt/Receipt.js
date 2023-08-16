import React, { useState, useEffect, useRef } from 'react';
import { collection, query, getDocs, limit,orderBy} from 'firebase/firestore';
import { db } from '../../firebase';
// import Navbar from '../../Components/Navigation/Navbar';
// import html2canvas from 'html2canvas';
import { NavLink } from "react-router-dom";

export const Receipt = () => {
  const [orders, setOrders] = useState([]);
  const cardRef = useRef(null);
  

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, 'Orders'), orderBy('date', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      const latestOrder = querySnapshot.docs[0];
  
      if (latestOrder) {
        const orderedItems = latestOrder.data().orderedItems || [];
        const latestOrderData = {
          id: latestOrder.id,
          ...latestOrder.data(),
          orderedItems: orderedItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        };
        setOrders([latestOrderData]);
      } else {
        setOrders([]);
      }
    };
  
    fetchOrders();
  }, []);
  
  
  const formatAmount = (totalAmount) => {
    return totalAmount.toLocaleString('en-PK');
  };

  const filteredOrders = orders.filter((order) => order.invoiceNo !== '');

  // const handleCapture = () => {
  //   if (cardRef.current) {
  //     html2canvas(cardRef.current, {
  //       useCORS: true,
  //       scrollX: 0,
  //       scrollY: -window.scrollY
  //     }).then((canvas) => {
  //       const screenshot = canvas.toDataURL('image/png');
  //       const link = document.createElement('a');
  //       link.href = screenshot;
  //       link.download = 'invoice.png';
  //       link.click();
  //     });
  //   }
  // };
  
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container">
        <div className="row">
      
          {filteredOrders.map((order, index) => (
            <div key={order.id} className="col-md-12" ref={cardRef}>
              <div className="card mb-4 bg-white">
                <p className="card-title">
                <h1>Your Receipt</h1>
                  <strong>Invoice No: </strong> {order.invoiceNo}
                </p>
                <h5 className="text-secondary">Order id {order.id}</h5>
                <p className="card-title">
                  {/* <strong>Order Id: </strong> {order.id} */}
                </p>
                <div className="card-body">
                  
                  {/* <h5 className="card-title">
                    Order No: {index + 1} */}
                  
                    <br></br>
                    <br></br>
                   <h5> <strong>Name: </strong>
                    {order.name}
                    </h5>
                  {/* </h5> */}
                  <br></br>
                
                  <p className="card-text">
                    <strong>Email: </strong> {order.email}
                  </p>
                  <p className="card-text">
                    <strong>Address: </strong> {order.address}
                  </p>
                  <p className="card-text">
                    <strong>City: </strong>
                    {order.city}
                  </p>
                  <p className="card-text">
                    <strong>State: </strong> {order.state}
                  </p>
                  <b>
                    {/* <p className="card-text">
                      Price: Pkr {formatAmount(order.totalAmount)}/-
                    </p> */}
                  </b>
                  <p className="card-text">
                    <strong>ShippingStatus: </strong> {order.ShippingStatus}
                  </p>
                  {order.orderedItems &&
                    order.orderedItems.map((item) => (
                      <div key={item.id}>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {item.name}
                        </h6>
                        <b>
                          <p className="card-text">
                            Price: Pkr {formatAmount(item.price)}/-
                          </p>
                        </b>
                        <p className="card-text">
                          <strong> Quantity: </strong> {item.quantity}
                        </p>
                        <div className="img1">

                          <img
                            src={item.image}
                            className="card-img-top"
                            alt={item.name}
                        />
                         
                        </div>
                      </div>
                    ))}
                    <br></br>
                    <br></br>
                    <br></br>
                     <h1 className="card-text-total d-flex justify-content-center">
                      Price: Pkr {formatAmount(order.totalAmount)}/-                      
                    </h1>
                    <NavLink to="/" className="navigate-link">
              Continue Shopping
            </NavLink>
                    {/* <button className="btn-primary" onClick={handleCapture}>Capture Screenshot</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
