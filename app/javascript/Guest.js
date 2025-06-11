import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

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
    <Stack
      direction="column"
      sx={{
        margin: "auto",
        mt: 2,
        backgroundColor: "white",
        maxWidth: 414,
        padding: "20px",
        textAlign: "center",
        borderRadius: 1,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 32, mb: 2 }}>
        Welcome
      </Typography>
      <Typography sx={{ display: "block", mb: 2 }}>
        Please provide your full name and phone number.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          borderRadius: 100,
          backgroundColor: "darkblue",
        }}
        onClick={() => {
          setSendingRequest(true);
        }}
        loading={sendingRequest}
      >
        View menu
      </Button>
    </Stack>
  );
};

export default Guest;
