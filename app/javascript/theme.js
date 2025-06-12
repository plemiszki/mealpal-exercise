import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    header: {
      fontWeight: 700,
      fontSize: 32,
    },
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
});

export default theme;
