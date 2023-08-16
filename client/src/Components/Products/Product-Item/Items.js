import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { Link } from "react-router-dom";
import "./items.css";

export default function Items() {
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState();
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);

  // Filter and search bar
  const filterItems = (items) => {
    if (!filter) {
      return items;
    }
    return items.filter((item) => item.category.toLowerCase() === filter.toLowerCase());
  };
  

  const sortItems = (items) => {
    if (sortOption === "priceLowToHigh") {
      return items.sort((a, b) => a.price - b.price);
    }
    if (sortOption === "priceHighToLow") {
      return items.sort((a, b) => b.price - a.price);
    }
    return items;
  };

  useEffect(() => {
    const filteredItems = filterItems(items);
    const sortedItems = sortItems(filteredItems);
    setSearchResults(
      sortedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items, filter, sortOption]);

  // Data retrieval code
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
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Search bar
  useEffect(() => {
    setSearchResults(
      items.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, items]);

  // Speech recognition
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      const regex = /\./g;
      var checker = result.replace(regex, '')
      setSearchTerm(checker);
    };
    setRecognition(recognition);
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  const formatAmount = (price) => {
    return price.toLocaleString("en-PK");
  };

  return (
    <div>
      <div className="landing p-3 mb-2 text-white">
        <div className="containeritem">
          <h1 className="first-hd1">Our Products</h1>
          <br />
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="form-group">
                </div>
                <div className="form-group">
                <label htmlFor="sort">Sort:</label>
                <select
                id="sort"
                className="form-control"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                >
                <option value="">None</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                </select>
                </div>
                <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? "Stop Listening" : "Speak"}
          </button>
        </div>
      </div>
      <div className="d-flex hy-4 customFlex">
        {searchResults.length > 0 ? (
          searchResults?.map((p, i) => {
            return (
              <div key={i} className="mainCard">
                <div className="my-4 card ">
                  <Link to={`/product/${p.id}`}>
                    <img src={p.image} className="card-img-top" alt="..." />
                  </Link>
                  <div className="card-body1">
                    <h5 className="card-title fw-bold"> {p.title}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Price: Pkr {formatAmount(p.price)}/-</p>
                    <p className="card-text">Quantity Available: {p.quantity}</p>
                  </div>
                  <button
                    type="button"
                    className="btnitem"
                    onClick={() => {
                      if (p.quantity > 0) {
                        dispatch(cartActions.addProduct(p));
                      }
                    }}
                    disabled={p.quantity < 1}
                  >
                    {p.quantity < 1 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  </div>
</div>
);
}
