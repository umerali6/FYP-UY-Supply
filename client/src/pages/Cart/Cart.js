import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import Navbar from "../../Components/Navigation/Navbar";
import { db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";

import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.totalAmount);
  const [items, setItems] = useState([]);

  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const text = "Your Cart is Empty";
      const typedText = isDeleting
        ? text.substring(0, currentText.length - 1)
        : text.substring(0, currentText.length + 1);

      if (typedText !== currentText) {
        setCurrentText(typedText);
      } else {
        setIsDeleting(true);
      }

      if (isDeleting && currentText === "") {
        setIsDeleting(false);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting]);

  const formatAmount = (amount) => {
    return amount.toLocaleString("en-PK");
  };

  const getAllProducts = async () => {
    const data = [];
    const dataRetrieval = query(collection(db, "Products"));

    const querySnapshot = await getDocs(dataRetrieval);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      product.id = doc.id;
      data.push(product);
    });

    setItems(data);
    console.log(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="cart-container">
        <div className="header">Your Cart</div>
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const product = items.find((prod) => prod.id === item.id);

              return (
                <div className="cart-item" key={item.id}>
                  <img className="item-image" src={item.image} alt="item" />
                  <div className="item-description">{item.title}</div>
                  <div className="item-quantity">
                    <div
                      className="item-quantity-button"
                      onClick={() => {
                        if (product.quantity > 0) {
                          dispatch(cartActions.addProduct(product));
                        }
                      }}
                    >
                      +
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      className="item-quantity-button"
                      onClick={() => dispatch(cartActions.removeQuantity(item.id))}
                    >
                      -
                    </div>
                  </div>
                  <div className="item-price">Pkr {item.price * item.quantity}/- </div>
                  <div
                    className="item-remove"
                    onClick={() => dispatch(cartActions.removeProduct(item.id))}
                  >
                    x
                  </div>
                  <div className="available-quantity">Qt Avail {product?.quantity}</div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart">{currentText}</div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="actions-container">
            <NavLink to="/" className="navigate-link">
              Continue Shopping
            </NavLink>

            <div className="total-container">
              <div>Total Amount: </div>
              <div className="total-amount">Pkr {formatAmount(cartAmount)}/-</div>
            </div>

            <div className="cart-actions">
              <button className="clear-cart" onClick={() => dispatch(cartActions.reset())}>
                Clear Cart
              </button>
              <button className="checkout" onClick={() => navigate("/checkout")}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
