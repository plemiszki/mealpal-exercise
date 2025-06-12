import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const StyledStack = styled(Stack)(() => ({
  backgroundColor: "white",
  maxWidth: 414,
  padding: "20px",
  textAlign: "center",
  borderRadius: 1,
  margin: "auto",
  marginTop: 16,
}));

const Guest = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitForm();
    }
  };

  const submitForm = async () => {
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
  };

  if (showThankYou) {
    return (
      <StyledStack direction="column">
        <Typography variant="header" sx={{ mb: 2 }}>
          Thank You!
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Thank you for submitting the form {name}.
        </Typography>
      </StyledStack>
    );
  }

  return (
    <StyledStack direction="column">
      <Typography variant="header" sx={{ mb: 2 }}>
        Welcome
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Please provide your full name and phone number.
      </Typography>
      <TextField
        label="Full Name"
        value={name}
        onChange={(e) => {
          setNameError(false);
          setName(e.target.value);
        }}
        variant="outlined"
        sx={{
          mb: nameError ? 1 : 2,
        }}
        error={nameError}
        onKeyDown={handleKeyDown}
      />
      {nameError ? (
        <Typography variant="error" sx={{ mb: 2, textAlign: "right" }}>
          *must be your first and last name
        </Typography>
      ) : null}
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => {
          setPhoneError(false);
          setPhone(e.target.value);
        }}
        variant="outlined"
        sx={{ mb: phoneError ? 1 : 4 }}
        error={phoneError}
        onKeyDown={handleKeyDown}
      />
      {phoneError ? (
        <Typography variant="error" sx={{ mb: 4, textAlign: "right" }}>
          *10 or 11 numbers only (ex. 1231231234)
        </Typography>
      ) : null}
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          borderRadius: 100,
          backgroundColor: "darkblue",
          py: 1,
        }}
        onClick={submitForm}
        loading={sendingRequest}
      >
        View menu
      </Button>
    </StyledStack>
  );
};

export default Guest;
