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
    error.data = errorData.errors;
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
          Thank You!
        </Typography>
        <Typography sx={{ display: "block", mb: 2 }}>
          Thank you for submitting the form {name}.
        </Typography>
      </Stack>
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
        onChange={(e) => {
          setNameError(false);
          setName(e.target.value);
        }}
        variant="outlined"
        sx={{ mb: 2 }}
        error={nameError}
      />
      {nameError ? (
        <Typography variant="error">
          *must be your first and last name
        </Typography>
      ) : null}
      <TextField
        label="phone number"
        value={phone}
        onChange={(e) => {
          setPhoneError(false);
          setPhone(e.target.value);
        }}
        variant="outlined"
        sx={{ mb: 4 }}
        error={phoneError}
      />
      {phoneError ? (
        <Typography variant="error">*numbers only (ex. 1231231234)</Typography>
      ) : null}
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
              const { data } = error;
              if (data.name) {
                setNameError(true);
              }
              if (data.phone) {
                setPhoneError(true);
              }
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
