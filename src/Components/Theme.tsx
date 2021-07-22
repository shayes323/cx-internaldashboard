import { createTheme, Typography } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F2F3F4",
    },
  },
  typography: {
    subtitle1: { fontFamily: "Montserrat", fontWeight: 1000, fontSize: 20 },
    subtitle2: { fontFamily: "Montserrat", fontWeight: 900, fontSize: 12},
    body1: { fontFamily: "Montserrat", fontWeight: 1200, fontSize: 25},
  },
});
