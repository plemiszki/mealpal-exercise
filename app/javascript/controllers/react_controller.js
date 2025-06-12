import { Controller } from "@hotwired/stimulus";
import React from "react";
import ReactDOM from "react-dom/client";
import Guest from "../Guest";
import { ThemeProvider, createTheme } from "@mui/material";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
      <ThemeProvider
        theme={createTheme({
          typography: {
            // h1: {
            //   fontSize: "1.5rem",
            //   fontWeight: 600,
            // },
            // h6: {
            //   fontSize: "0.9rem",
            //   fontWeight: 600,
            // },
            // bold: {
            //   fontWeight: 700,
            // },
            error: {
              fontSize: 14,
              fontWeight: 500,
              color: "rgb(211, 47, 47)",
            },
          },
        })}
      >
        <Guest />
      </ThemeProvider>
    );
  }
}
