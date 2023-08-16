import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import Navbar from "../../Components/Navigation/Navbar";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";


const OrderHistory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchOrders = async () => {
      if (user?.uid) {
        const q = query(collection(db, "Orders"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const ordersData = querySnapshot.docs.map((doc) => {
          const orderedItems = doc.data().orderedItems || [];
          return {
            id: doc.id,
            userId: doc.data().userId,
            ...doc.data(),
            orderedItems: orderedItems.map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
            })),
          };
        });

        setOrders(ordersData);
      }
      setLoading(false); // Set loading state to false after fetching orders
    };

    fetchOrders();
  }, [user?.uid]);

  useEffect(() => {
    const getPayments = async () => {
      const data = [];
      const dataRetrieval = collection(db, "Payment");

      const querySnapshot = await getDocs(dataRetrieval);
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        data.push(product);
      });

      setPayments(data);
    };

    getPayments();
  }, []);

  const formatAmount = (totalAmount) => {
    return totalAmount.toLocaleString("en-PK");
  };

  if (loading) {
    return <div> No Order Found </div>; // Render loading state while fetching orders
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orders.length === 0 ? (
            <div className="col-md-12">
              <div className="card mb-4 bg-white">
                <div className="card-body">
                  <TransitionGroup>
                    <CSSTransition key="no-order-animation" timeout={500} classNames="fade">
                      <div className="no-order-text">No order found</div>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              </div>
            </div>
          ) : (
            orders.map((order, index) => (
              <div key={order.id} className="col-md-12">
                <div className="card mb-4 bg-white">
                  <p className="card-title">
                    <strong>Order Id:</strong> {order.id}
                  </p>
                <h3>  <strong>Invoice No </strong> {order.invoiceNo}</h3>
                  <p className="card-title">
                    {/* <strong>User Id:</strong> {order.userId} */}
                  </p>
                  <div className="card-body">
                    {/* <h5 className="card-title">
                      Order No: {index + 1}) <strong>Name:</strong> {order.name}
                    </h5> */}
                    <p className="card-text">
                      <strong>Email:</strong> {order.email}
                    </p>
                    <p className="card-text">
                      <strong>Address:</strong> {order.address}
                    </p>

          
                   
                    <p className="card-text">
                      <strong>City:</strong> {order.city}
                    </p>
                    <p className="card-text">
                      <strong>State:</strong> {order.state}
                    </p>
                    <b>
                      {/* <p className="card-text">
                        Price: Pkr {formatAmount(order.totalAmount)}/-
                      </p> */}
                    </b>
                    <p className="card-text">
                      <strong>ShippingStatus:</strong> {order.ShippingStatus}
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
                            <strong>Quantity:</strong> {item.quantity}
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
                      <h1 className="card-text-total d-flex justify-content-center">
                     Total Price: Pkr {formatAmount(order.totalAmount)}/-
                    </h1>
                    {/* {payments.map((payment) => (
  <div key={payment.id}>
    <p className={`card-text font-weight-bold ${payment.PaymentStatus === 'Paid' ? 'text-success' : 'text-danger'}`}>PaymentStatus: {payment.PaymentStatus}</p>
  </div>
))} */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

