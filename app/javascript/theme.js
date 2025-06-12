import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    header: {
      fontWeight: 700,
      fontSize: 32,
    },
    error: {
      fontSize: 14,
      fontWeight: 500,
      color: "rgb(211, 47, 47)",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
