import React, { useState,useEffect } from "react";
import { storage, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navigation/Navbar";
import ReactStars from "react-rating-stars-component";
import "react-toastify/dist/ReactToastify.css";


const AddTestimonial = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  
  const [Fname, setFname] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [progress, setProgress] = useState(0);
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const [rating, setRating] = useState(0);

  const handleProductImg = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImage(selectedFile);
        setImageError("");
      } else {
        setImage(null);
        setImageError("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("please select your file");
    }
  };

  const handleAddProducts = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `Testimonial-Images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Image Uploaded", downloadURL);
          try {
            const docRef = addDoc(collection(db, "Testimonial"), {
              Fname,
              description,
              image: downloadURL,
              rating,
            });
          } catch (err) {
            console.error("Error adding document: ", e);
          }

          toast.success("Feed-Back Added Successfully ", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => navigate("/testimonial"), 3000);
        });
      }
    );
  };



  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="landing4">
        <div className="container pt-5  ">
          <div className="row justify-content-center">
            <div className=" testimonialh2 col-md-7">
              <h2>Testimonial</h2>
              <hr></hr>
              <form autoComplete="off" className="form-group" onSubmit={handleAddProducts}>
                <label>Your Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setFname(e.target.value)}
                  value={Fname}
                />

                <label>Note</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
                <label>Upload Your Image</label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  required
                  onChange={handleProductImg}
                />

                {imageError && (
                  <>
                    <br></br>
                    <div className="error-msg">{imageError}</div>
                  </>
                )}
                <ReactStars
                  count={5}
                  value={rating}
                  size={24}
                  onChange={(rating) => setRating(rating)}
                  activeColor="#ffd700"
                />

                <h6>Please Rate your Product</h6>
                <br></br>
                <h3>Uploading % {progress}</h3>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="btn btn-dark btn-md">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;
