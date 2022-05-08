import "./payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";




const stripePromise = loadStripe(
    "pk_test_51KsTWMGmgWtFO5XORc4DANOKfzWd5zwEk7F69ReipWfzFyf81FRo2yGbAp0ibr0WjL9QXJfl5VQOkb7Yhj0D96Hs00Rj7mITpV"
);

const Payment = () => {
 
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/kid/create-payment-intent/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: 2000 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
               console.log(data.clientSecret)
            });
    }, []);
 
    const appearance = {
        theme: "flat",
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm  />
                </Elements>
            )}
        </div>
    );
};

export default Payment;