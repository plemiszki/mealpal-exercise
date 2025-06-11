import React, { useState } from "react";

const Guest = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showThankYou, setShowThankYou] = useState(true);

  if (showThankYou) {
    return (
      <div className="guest">
        <h1 className="guest__title">Thank You!</h1>
        <p className="guest__subtitle">
          Thank you for submitting the form {name}.
        </p>
      </div>
    );
  }

  return (
    <div className="guest">
      <h1 className="guest__title">Welcome</h1>
      <p className="guest__subtitle">
        Please provide your full name and phone number.
      </p>
    </div>
  );
};

export default Guest;
