import { Home } from "./Home";
import { NewPage } from "./NewPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Title } from "./Components/Title";
import { NavBar } from "./Components/NavBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange, purple } from "@material-ui/core/colors";
import { TextFields } from "./Components/TextFields";
import { ZonesDropDown } from "./Components/ZonesDropdown";
import { GoButton } from "./Components/GoButton";

export function App() {
  return (
    <ThemeProvider theme={Theme}>
    <Router>
      <div className="PageConstants">
        <NavBar />
        <TextFields />
        <ZonesDropDown />
        <GoButton />
      </div>
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/RemoteFeeds">
              <NewPage />
            </Route>
          </Switch>
        </div>
    </Router>
    </ThemeProvider>
  );
}

const Theme: any = createMuiTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: orange[400],
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

