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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { GoButton } from "./GoButton";
import { StartTextField, EndTextField } from "./TextFields";
import { PublishersDropDown } from "./PublishersDropdown";
import { PageSelectDropDown } from "./PageSelectDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuButton } from "./MenuButton";
import { theme } from "./Theme"

export function NavBar() {
  

  return (
    <ThemeProvider theme={theme}>
    <AppBar variant="outlined" elevation={0} position="static" color="primary">
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
            <Box style={{marginLeft: "50px"}}>View:</Box>
          </Grid>
          <Grid item xs>
              <PageSelectDropDown  />
          </Grid>
          <Grid item xs>
            <Box style={{marginLeft:"25px"}}>Publisher: </Box>
          </Grid>
          <Grid item xs>
            <PublishersDropDown />
          </Grid>
          <Grid item xs>
            <Box style={{marginLeft:"47px"}}>Start Date: </Box>
          </Grid>
          <Grid item xs>
           <StartTextField />
           </Grid>
           <Grid item xs>
            <Box style={{marginLeft:"50px"}}>End Date: </Box>
          </Grid>
          <Grid item xs>
            <EndTextField />
          </Grid>
        </Grid>
      </Box>
    </AppBar>
    </ThemeProvider>
  );
}
