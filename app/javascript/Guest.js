import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

export const getCsrfToken = () => {
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    return metaTag.getAttribute("content");
  } else {
    return null;
  }
};

const postApiData = async ({ body }) => {
  const response = await fetch("/api/v1/guests", {
    method: "POST",
    headers: {
      "x-csrf-token": getCsrfToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (response.status === 201) {
    return;
  } else {
    const errorData = await response.json();
    const error = new Error("Request failed");
    error.data = errorData;
    throw error;
  }
};

const Guest = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
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
      <TextField
        label="full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
        error={nameError}
      />
      <TextField
        label="phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        variant="outlined"
        sx={{ mb: 4 }}
        error={phoneError}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          borderRadius: 100,
          backgroundColor: "darkblue",
        }}
        onClick={async () => {
          setSendingRequest(true);
          postApiData({
            body: {
              guest: {
                name,
                phone,
              },
            },
          })
            .then(() => {
              setSendingRequest(false);
              setShowThankYou(true);
            })
            .catch((error) => {
              setSendingRequest(false);
              console.log(error.data);
            });
        }}
        loading={sendingRequest}
      >
        View menu
      </Button>
    </Stack>
  );
};

export default Guest;
