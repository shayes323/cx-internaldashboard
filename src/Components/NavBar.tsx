import {
  AppBar,
  makeStyles,
  Typography,
  Button,
  withStyles,
  Box,
  Grid,
  Paper,
  ThemeProvider,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { StartDateField, EndDateField } from "./DateFields";
import { PublishersDropDown } from "./PublishersDropdown";
import { PageSelectDropDown } from "./PageSelectDropDown";
import MenuIcon from "@material-ui/icons/Menu";
// import { theme } from "./Theme";
import { stateStoreContext } from "../StateStore";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RemoteFeedsDropDown } from "./RemoteFeedsDropdown";
import "./NavBar.css";

export const NavBar: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  return (
    <span>
    <span className="overall">
      <div className="title">
        <CompanyLogo />
        Insights
      </div>
      <Box m={0}>
        <Grid
          container
          direction="row"
          alignItems="center"
          alignContent="space-between"
          spacing={2}
        >
          <Grid item xs>
            <span className="gutterLeft">View:</span>
          </Grid>
          <Grid item xs>
            <span><PageSelectDropDown/></span>
          </Grid>
          <Grid item xs>
            <span>
            {stateStore.page === "publishers" ? (
              <span className="label">Publisher: </span>
            ) : (
              <span className="label">Remote Feeds: </span>
            )}
            </span>
          </Grid>
          <Grid item xs>
            <span className="component">
            {stateStore.page === "publishers" ? (
              <PublishersDropDown />
              
            ): (
              <RemoteFeedsDropDown />
            )}
            </span>
          </Grid>
          <Grid item xs>
            <span className="label">Start Date:</span>
          </Grid>
          <Grid item xs>
            <span><StartDateField /></span>
          </Grid>
          <Grid item xs>
            <span className="label">End Date:</span>
          </Grid>
          <Grid item xs>
            <span className="gutterRight"><EndDateField /></span>
          </Grid>
        </Grid>
     
      </Box>
      </span>

      <div style={{clear: "both"}}>
      <Divider
          style={{marginRight: "5vh", marginLeft: "5vh", height: "1.5px", alignContent: "center", }}
        />
        </div>
        </span>
  );
});

function CompanyLogo() {
  return <img src="CXLogo.png" className="logo" alt="CX Logo" />;
}
