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


export const ViewReviews = () => {


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
    const dataRetrieval = query(collection(db, "Testimonial"));
    
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

  
  
  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this Review?")) {
      try {
        const itemRef = doc(db, "Testimonial", itemId);
        await deleteDoc(itemRef);
        const updatedItems = items.filter((item) => item.id !== itemId);
        setItems(updatedItems);
        toast.success("Review deleted successfully!");
      } catch (error) {
        console.error("Error deleting Review:", error);
        toast.error("Failed to delete Review");
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
    <h1 className="text-center mb-5">Testimonial</h1>
      <div className="container">
        <div className="row">
        <div className="card-body8">
    <br></br>
    {items.map((item, index) => (
  <div key={item.id} className="card">
    <div className="card-body">
      <h5 className="card-title">Review No: {index + 1}</h5>
      <br></br>
      <h5 className="card-title">Name: {item.Fname}</h5>
      <div className="item-img">
        <img src={item.image} alt={item.title} />
      </div>
      <p className="card-text">{item.description}</p>
    
      <p className="card-text">Rating: 
  {Array.from({ length: item.rating }, (_, index) => (
    <span key={index} className="star">★</span>
  ))}
</p>

      <div>
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



