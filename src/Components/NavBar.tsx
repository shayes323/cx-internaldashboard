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
import { theme } from "./Theme"
import { stateStoreContext } from "../StateStore";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { RemoteFeedsDropDown } from "./RemoteFeedsDropdown";


export const NavBar: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


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
            {stateStore.page === "publishers" ? <Box style={{marginLeft:"25px"}}>Publisher: </Box> : <Box style={{ marginLeft: "-12px" }}>Remote Feeds: </Box> }
          </Grid>
          <Grid item xs>
            {stateStore.page === "publishers" ? <PublishersDropDown /> : <RemoteFeedsDropDown />}
          </Grid>
          <Grid item xs>
            <Box style={{marginLeft:"44px"}}>Start Date: </Box>
          </Grid>
          <Grid item xs>
           <StartDateField />
           </Grid>
           <Grid item xs>
            <Box style={{marginLeft:"50px"}}>End Date: </Box>
          </Grid>
          <Grid item xs>
            <EndDateField />
          </Grid>
        </Grid>
        <Divider style={{marginLeft: "20px", marginRight: "20px", height: "1.5px"}} />
    
    </Box>

    </ThemeProvider>
  );
})
