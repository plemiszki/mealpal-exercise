import React, { useState } from "react";
import { Button } from "@mui/material";

const Guest = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={() => {
          setSendingRequest(true);
        }}
        loading={sendingRequest}
      >
        View menu
      </Button>
    </div>
  );
};

export default Guest;
