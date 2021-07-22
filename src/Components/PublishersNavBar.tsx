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
import { GoButton } from "./GoButton";
import { PubStartTextField, PubEndTextField } from "./PubTextFields";
import { PublishersDropDown } from "./PublishersDropdown";
import { PageSelectDropDown } from "./PageSelectDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import { MenuButton } from "./MenuButton";
import { theme } from "./Theme"

export function PublishersNavBar() {
  

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
            <Box style={{marginLeft:"44px"}}>Start Date: </Box>
          </Grid>
          <Grid item xs>
           <PubStartTextField />
           </Grid>
           <Grid item xs>
            <Box style={{marginLeft:"50px"}}>End Date: </Box>
          </Grid>
          <Grid item xs>
            <PubEndTextField />
          </Grid>
        </Grid>
        <Divider style={{marginLeft: "20px", marginRight: "20px", height: "1.5px"}} />
    
    </Box>

    </ThemeProvider>
  );
}
