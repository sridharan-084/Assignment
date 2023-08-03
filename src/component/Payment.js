import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// isme ye line change karniiii hai dhyn se ....//
const PUBLIC_KEY = env.KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export function StripeContainer() {
  console.log(PUBLIC_KEY);
  return (
    <Elements stripe={stripeTestPromise}>
      <Payment />
    </Elements>
  );
}

const Payment = () => {
  const { userEmail, Package, selectedCard, card } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement(CardElement);
    //console.log(cardElement);
    //console.log(userEmail);
    // Create a PaymentMethod with the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        let email = localStorage.getItem("email");
        email = await JSON.parse(email);
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
          userEmail: email,
          card: card,
          Package: Package,
        });

        if (response.data.success) {
          alert("Successful payment");
        }
        navigate("/details");
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  // isme abhi refresh vale chiz ko bhi handle karna-hai or .....//

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 p-4">
      <div className="row p-5 bg-light rounded">
        <h2 className="h1">Card Information</h2>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-2">
              <label className="h6">Card Number</label>
              <CardElement
                className="form-control"
                options={{ style: { base: { fontSize: "16px" } } }}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Submit Payment
            </button>
          </form>
        </div>
        <div className="col-md-6 mt-2">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="card-title h3">Order Summary</h2>
              <div className="plan-details">
                <p className="h5">Plan: {card.type}</p>
                <p className="h5">Billing Cycle: {Package}</p>
                <p className="h5">Plan Price: {card.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeContainer;
