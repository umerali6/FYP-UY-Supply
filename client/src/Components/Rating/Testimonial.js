import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import ReactStars from "react-rating-stars-component";
import Navbar from "../Navigation/Navbar";
// import "../Products/Product-Item/items.css";
import "./testimonial.css"
import { useNavigate } from "react-router-dom";


const Testimonial = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  const q = query(collection(db, "Testimonial"));

  const [totalProducts, settotalProducts] = useState([]);
  const data = [];

  const getAllProducts = async () => {
    const querySnapshot = await getDocs(q);
    // [{}] | {{}}
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    settotalProducts(data);
  };

  var value = 0;

  useEffect(() => {
    if (value === 0) {
      getAllProducts();
    }
    ++value;
    return;
  }, []);

  const chunks = totalProducts.reduce((acc, value, i) => {
    if (i % 3 === 0) {
      acc.push(totalProducts.slice(i, i + 3));
    }
    return acc;
  }, []);

  return (
    <div>
      <Navbar />
      <div className="landing-testimonial p-3 mb-2 text-white">
        <div className="container1">
          <h1 className="first-hd">Testimonials</h1>
          {chunks.map((chunk, i) => (
            <div className="d-flex hy-4 customFlex" key={i}>
              {chunk.map((v, j) => (
                <div key={j} className="mainCard1">
                 
                  <div className="my-4 card2">
                    <img src={v.image} className="card-img-top" alt="..." />
                    <div className="card-body1">
                      <h5 className="card-title fw-bold">{v.Fname}</h5>
                      <p className="card-text">{v.description}</p>
                      <ReactStars
                        count={5}
                        value={v.rating}
                        size={24}
                        edit={false}
                        color2={"#ffd700"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
