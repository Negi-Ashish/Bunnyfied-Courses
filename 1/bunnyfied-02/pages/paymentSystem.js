import { useState, useEffect } from "react";

export default function PaymentSystem() {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const payNow = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      // Create order by calling the server endpoint
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
        }),
      });

      const order = await response.json();
      console.log(" order", order);
      // Open Razorpay Checkout
      const options = {
        key: "rzp_test_Y2wy8t1wD1AFaA", //rzp_test_PgdcAVbkK0t1Ue
        amount: order.amount,
        currency: order.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id, // This is the order_id created in the backend
        callback_url: "/api/verify-payment", // Your success URL
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response) {
          console.log("This response", response);
          fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                alert("Payment verification success");
              } else {
                alert("Payment verification failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error verifying payment");
            });
        },
      };

      const rzp = new window.Razorpay(options);
      console.log("THIS IS ezp", rzp);
      rzp.open();
      console.log("THIS IS ezp open", rzp.open());
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating order");
    }
  };

  return (
    <div>
      <h1>Razorpay Payment Gateway Integration</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          payNow();
        }}
      >
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}
