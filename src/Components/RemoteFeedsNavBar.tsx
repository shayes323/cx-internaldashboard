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
import { RFStartTextField, RFEndTextField } from "./RFTextFields";
import { PublishersDropDown } from "./PublishersDropdown";
import { PageSelectDropDown } from "./PageSelectDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import { theme } from "./Theme";
import { RemoteFeedsDropDown } from "./RemoteFeedsDropdown";

export function RemoteFeedsNavBar() {
  return (
    <ThemeProvider theme={theme}>
     
        <div>
          <Typography>CX Insights</Typography>
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
              <Box style={{ marginLeft: "50px" }}>View:</Box>
            </Grid>
            <Grid item xs>
              <PageSelectDropDown />
            </Grid>
            <Grid item xs>
              <Box style={{ marginLeft: "-12px" }}>Remote Feeds: </Box>
            </Grid>
            <Grid item xs>
              <RemoteFeedsDropDown />
            </Grid>
            <Grid item xs>
              <Box style={{ marginLeft: "44px" }}>Start Date: </Box>
            </Grid>
            <Grid item xs>
              <RFStartTextField />
            </Grid>
            <Grid item xs>
              <Box style={{ marginLeft: "50px" }}>End Date: </Box>
            </Grid>
            <Grid item xs>
              <RFEndTextField />
            </Grid>
          </Grid>
        </Box>
        <Divider style={{marginLeft: "20px", marginRight: "20px", height: "1.5px"}} />
    </ThemeProvider>
  );
}
