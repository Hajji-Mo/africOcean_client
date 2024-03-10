import { createTheme } from "@mui/material/styles";
export const colors = {
  white: "#fff",
  black: "#000",
  main: "#ffa200",
  darkGrey: "#C1AF92",
  Grey200: "#D7CCBA",
  Grey100: "#f3f3f3",
  Brown: "#4F361A",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
};
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffa200",
      darkGrey: "#C1AF92",
      Grey200: "#D7CCBA",
      Grey100: "#f3f3f3",
      Brown: "#4F361A",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
