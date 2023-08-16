import React, {useEffect} from 'react';
import Navbar from '../../Components/Navigation/Navbar';
import './faq.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


export const Faq = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isUserLoggedin") !== "yes") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span className="question-icon">Q</span> How do I place an order?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <span className="answer-icon">A</span> To place an order, follow these steps:
                <ol>
                  <li>Visit our website and browse the available products.</li>
                  <li>Select the desired items and add them to your cart.</li>
                  <li>Proceed to the checkout page and enter your shipping information.</li>
                  <li>Review your order details and complete the payment.</li>
                  <li>You will receive a confirmation email with your order details.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <span className="question-icon">Q</span> Can I cancel my order?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <span className="answer-icon">A</span> No, you can cancel your order.
                Please contact our customer support team for assistance.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <span className="question-icon">Q</span> What payment methods do you accept?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <span className="answer-icon">A</span> We accept various payment methods, including credit cards, debit cards, and PayPal.
                You can choose your preferred payment option during the checkout process.
              </div>
            </div>
          </div>
          {/* Add more accordion items for other FAQs */}
        </div>
      </div>
    </>
  );
};

export default Faq;
