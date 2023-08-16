

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../../Components/Products/Product-Item/Items";
import Navbar from "../../Components/Navigation/Navbar";
import "./HomeFinal.css";

const HomeFinal = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js";
    script.integrity =
      "sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    let constrain = 20;
    let mouseOverContainer = document.getElementById("ex11");
    let ex1Layer = document.getElementById("ex11-layer");

    function transforms(x, y, el) {
      let box = el.getBoundingClientRect();
      let calcX = -(y - box.y - box.height / 2) / constrain;
      let calcY = (x - box.x - box.width / 2) / constrain;

      return (
        "perspective(10000px) " +
        "   rotateX(" +
        calcX +
        "deg) " +
        "   rotateY(" +
        calcY +
        "deg) "
      );
    }

    function transformElement(el, xyEl) {
      el.style.transform = transforms.apply(null, xyEl);
    }

    mouseOverContainer.onmousemove = function (e) {
      let xy = [e.clientX, e.clientY];
      let position = xy.concat([ex1Layer]);

      window.requestAnimationFrame(function () {
        transformElement(ex1Layer, position);
      });
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid my-bg1">
        <div className="container mg-top">
          <div className="row">
            <div className="col-md-6">
              <div className="banner-content">
                <img src="images/charactor-background.png" alt="..." />
                <h4>Welcome to Uy-Supply Store</h4>
                <h1>
                  Creative <br></br> E-Commerce Store
                </h1>    
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p> */}
              </div>
            
            </div>
            <div className="col-md-6">
              <div className="banner-image" id="ex11">
                <img src="images/charactor.png" alt="Character" id="ex11-layer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="third">
        <Items />
      </div>
    </div>
  );
};

export default HomeFinal;
