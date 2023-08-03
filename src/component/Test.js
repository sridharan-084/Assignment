import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const PUBLIC_KEY = process.env.KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <Payment />
    </Elements>
  );
}

const Payment = () => {
  const { Package, selectedCard } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(elements);

    // Use CardElement to get the card details
    const cardElement = elements.getElement(CardElement);
    console.log(cardElement);
    // Create a PaymentMethod with the card details
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          alert("Successful payment");
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-red p-4">
      <div className="row bg-info p-5 rounded">
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
                <p className="h5">Plan: {selectedCard}</p>
                <p className="h5">
                  Billing Cycle: {Package === "yearly" ? "Yearly" : "Monthly"}
                </p>
                <p className="h5">Plan Price: {1000}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeContainer;
