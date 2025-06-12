import { Controller } from "@hotwired/stimulus";
import React from "react";
import ReactDOM from "react-dom/client";
import Guest from "../Guest";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const root = ReactDOM.createRoot(document.getElementById("app"));
    root.render(
      <ThemeProvider theme={theme}>
        <Guest />
      </ThemeProvider>
    );
  }
}
