import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51OcyimJQ5WptycoMQkk4Z5S3gFB7AvrlJHqJi6QQOqKHzBOLlFKKPq5kR1WfdyaQoAUoQuuotRXeGdwE8Oe6FWuE00xMU4xvmp"
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("/create-checkout-session")
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}
