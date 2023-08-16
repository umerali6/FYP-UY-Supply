import { useState, useEffect } from "react";

import { useParams,NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../Components/Products/Product-Item/items.css";
import "./Productpage.css";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      const productRef = doc(db, "Products", productId.toString());
      try {
        const doc = await getDoc(productRef);
        setProduct(doc.data());
      } catch (error) {
        console.error(error);
      }
    };
    getProduct();
  }, [productId]);

  return (
    <div>
   
      <div className="cart-container">
        <div className="product-page-container">
          <div className="product-image2">
            <img src={product.image} alt="Product Image" />
          </div>
          <div className="product-details">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Pkr/- {product.price}</p>
            <p className="product-quantity">Quantity: {product.quantity}</p>
            <button
              className="add-to-cart-btn"
              type="button"
              onClick={() => {
                if (product.quantity > 0) {
                  dispatch(cartActions.addProduct(product));
                }
              }}
            >
              Add to Cart
            </button>
            <br></br>
            <NavLink to="/" className="navigate-link">
              Continue Shopping
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
