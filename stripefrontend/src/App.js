import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "My celebal Intern Project",
    price: 25,
    productBy: "Amal Thomas(Celebal Intern)",
  });

  const makePayment = async (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`http://localhost:8282/payment`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("RESPONSE ", data);
      toast.success("Payment successful!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Payment failed. Please try again later.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy My Project"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <button className="btn-large pink">
            Buy My project for just ${product.price}
          </button>
        </StripeCheckout>
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
