import React, {useEffect} from "react";
// import { Addtestimonial } from './Addtestimonial'
// import Testimonal from './Testimonial'
import Navbar from "../../Components/Navigation/Navbar";
import "./AboutUs.css";
import { useNavigate } from "react-router-dom";


const AboutUs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <div className="container-fluid rm-pd">
        <div className="row">
          <div className="col-md-8 rm-pd">
            <div className="box">
              <h1>Our Story</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis enim eveniet
                maxime amet alias! Soluta aspernatur rerum,nr atque voluptatum deleniti odit cumque
                harum! Pariatur eius nesciunt tempore? Quos corporis maiores dolorem fugit
                distinctio possimus, nostrum, labore, quia dolor blanditiis quasi eligendi fugiat
                dignissimos non repellat impedit quam reiciendis eaque. Eligendi. Lorem ipsum dolor,
                sit amet consectetur adipisicing elit. Blanditiis enim eveniet maxime amet alias!
                Soluta aspernatur rerum,nr atque voluptatum deleniti odit cumque harum! Pariatur
                eius nesciunt tempore? Quos corporis maiores dolorem fugit distinctio possimus,
                nostrum, labore, quia dolor blanditiis quasi eligendi fugiat dignissimos non
                repellat impedit quam reiciendis eaque. Eligendi. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Blanditiis enim eveniet maxime amet alias! Soluta
                aspernatur rerum,nr atque voluptatum deleniti odit cumque harum! Pariatur eius
                nesciunt tempore? Quos corporis maiores dolorem fugit distinctio possimus, nostrum,
                labore, quia dolor blanditiis quasi eligendi fugiat dignissimos non repellat impedit
                quam reiciendis eaque. Eligendi. Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Blanditiis enim eveniet maxime amet alias! Soluta aspernatur rerum,nr atque
                voluptatum deleniti odit cumque harum! Pariatur eius nesciunt tempore? Quos corporis
                maiores dolorem fugit distinctio possimus, nostrum, labore, quia dolor blanditiis
                quasi eligendi fugiat dignissimos non repellat impedit quam reiciendis eaque.
                Eligendi.
              </p>
            </div>
          </div>
          <div className="col-md-4 rm-pd">
            <div className="box-img">
              <img src="images/about-img.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
