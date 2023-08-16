import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
import { collection, query, getDocs, doc, updateDoc , deleteDoc} from "firebase/firestore";
import "./../Products/Product-Item/items.css"
import Adminpanel from './Adminpanel';
import { navigate, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ViewProduct = () => {
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(0);


  // checking email
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user || user.email !== 'umeraliusmani1@gmail.com') {
     

        navigate('/');
      }
    });

    return () => {
      unsubscribe();
    };
  },);

  const [items, setItems] = useState([]);

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


  const handleQuantityChange = async (itemId, newQuantity) => {
    const itemRef = doc(db, "Products", itemId);
    await updateDoc(itemRef, { quantity: newQuantity });
  }
  const handleSubmit = async (itemId, newQuantity) => {
    await handleQuantityChange(itemId, newQuantity);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  

  
  const handlePriceChange = async (itemId, newPrice) => {
    const itemRef = doc(db, "Products", itemId);
    await updateDoc(itemRef, { price: newPrice });
  }
  const handleSubmit2 = async (itemId, newPrice) => {
    await handlePriceChange(itemId, newPrice);
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          price: newPrice
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  

  
  
  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const itemRef = doc(db, "Products", itemId);
        await deleteDoc(itemRef);
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
        toast.success("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };
  
  
  const handleImageChange = async (itemId) => {
    const storageRef = ref(storage, `Product-Images/${itemId}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Image Uploaded", downloadURL);
          // Update the image URL in the database
          const itemRef = doc(db, "Products", itemId);
          updateDoc(itemRef, { image: downloadURL });
          toast.success("Image Updated successfully!", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
      }
    );
  }
  return (
    <div>
    <Adminpanel />
    <ToastContainer />
    <h1 className="text-center mb-5">Listed Products</h1>
      <div className="container">
        <div className="row">
        <div className="card-body8">
    <br></br>
    {items.map((item, index) => (
  <div key={item.id} className="card">
    <div className="card-body">
      <h5 className="card-title">Product No: {index + 1}</h5>
      <h5 className="card-title">Name: {item.title}</h5>
      <div className="item-img">
        <img src={item.image} alt={item.title} />
      </div>
      <p className="card-text">{item.description}</p>
      <p className="card-text">Price: Pkr {item.price}/=</p>
      <p className="card-text">Available: {item.quantity}</p>
      <div>
        <label htmlFor={`quantity_${item.id}`}>Edit Quantity:</label>
        <input
          type="number"
          id={`quantity_${item.id}`}
          value={item.quantity}
          onChange={(e) => handleSubmit(item.id, e.target.value)}
        />
        <h4>Edit Price</h4>
        <input
          type="number"
          id={`price_${item.id}`}
          value={item.price}
          onChange={(e) => handleSubmit2(item.id, e.target.value)}
        />
        <br />
        <button
          type="button"
          className="btn btn-danger1"
          onClick={() => handleDelete(item.id)}
        >
          X
        </button>
        <h5>Delete a product</h5>
        <div>
          <label htmlFor={`image_${item.id}`}>Edit Image:</label>
          <input
            type="file"
            id={`image_${item.id}`}
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button onClick={() => handleImageChange(item.id)}>
            Update Image
          </button>
        </div>
      </div>
    </div>
  </div>
))}
</div>
    </div>
   
</div>
  </div>
  )
}


