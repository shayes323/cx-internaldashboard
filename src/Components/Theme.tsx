import { createMuiTheme, Typography } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F2F3F4",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
