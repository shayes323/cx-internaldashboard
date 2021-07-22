import { Box, Container, Grid } from "@material-ui/core";
import { Ctr } from "../Components/Ctr";
import { Ecpm } from "../Components/Ecpm";
import { EstimatedRevenue } from "../Components/EstimatedRevenue";
import { FillRate } from "../Components/FillRate";
import { Impressions } from "../Components/Impressions";
import { Requests } from "../Components/Requests";
import { RFAvgBidEcpm } from "../Components/RFAvgBidEcpm";
import { RFBids } from "../Components/RFBids";
import { RFCoverage } from "../Components/RFCoverage";
import { RFGrossRevenue } from "../Components/RFGrossRevenue";
import { RFRequestedBids } from "../Components/RFRequestedBids";
import { WinRate } from "../Components/WinRate";

export function RFSpacedPanels() {
  return (
    <Box p={2}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        spacing={4}
        style={{ display: "flexInline", height: 110 }}
      >
        <Grid item xs>
          <RFGrossRevenue />
        </Grid>
        <Grid item xs>
          <RFRequestedBids />
        </Grid>
        <Grid item xs>
          <RFBids />
        </Grid>
        <Grid item xs>
          <RFAvgBidEcpm />
        </Grid>
        <Grid item xs>
          <RFCoverage />
        </Grid>
      </Grid>
    </Box>
  );
}
