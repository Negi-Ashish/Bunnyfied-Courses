import { useState, useEffect } from "react";
import PhonepeGateway from "phonepepg";

export default function PhonePay() {
  const [amount, setAmount] = useState("");

  let gateway = new PhonepeGateway({
    merchantId: "PGTESTPAYUAT",
    saltKey: "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399",
    saltIndex: 1,
    isDev: true, // false for production
  });

  let transactionId = "testTR12345";

  const payNow = async () => {
    if (!amount) return alert("Please enter an amount");

    try {
      console.log("PhonePay");

      await gateway.initPayment({
        amount: amount,
        transactionId: transactionId,
        userId: "userid",
        redirectUrl: "/",
        callbackUrl: "/error",
      });

      const resp = await gateway.paymentStatus(transactionId);
      console.log("RESP", resp);
    } catch (error) {
      console.error("Error:", error);
      alert("Error in Payment");
    }
  };

  return (
    <div>
      <h1>PhonePay Payment Gateway Integration</h1>
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
