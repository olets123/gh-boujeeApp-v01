import { createTheme } from "@mui/material/styles";

export const boujeeTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    text: {
      primary: "#ffffff",
      secondary: "#00000",
    },
    primary: {
      main: "#15202B",
    },
    secondary: {
      main: "#0784b5",
      light: "#fff",
    },
    background: {
      default: "#15202B",
      paper: "#000000",
    },
  },
});
