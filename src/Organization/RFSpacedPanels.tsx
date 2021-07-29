import { Box, Container, Grid } from "@material-ui/core";
import { Ctr } from "../Components/TopPanels/Ctr";
import { Ecpm } from "../Components/TopPanels/Ecpm";
import { EstimatedRevenue } from "../Components/TopPanels/EstimatedRevenue";
import { FillRate } from "../Components/TopPanels/FillRate";
import { Impressions } from "../Components/TopPanels/Impressions";
import { Requests } from "../Components/TopPanels/Requests";
import { AvgBidEcpm } from "../Components/TopPanels/AvgBidEcpm";
import { Bids } from "../Components/TopPanels/Bids";
import { Coverage } from "../Components/TopPanels/Coverage";
import { GrossRevenue } from "../Components/TopPanels/GrossRevenue";
import { RequestedBids } from "../Components/TopPanels/RequestedBids";
import { WinRate } from "../Components/TopPanels/WinRate";

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
          <GrossRevenue />
        </Grid>
        <Grid item xs>
          <RequestedBids />
        </Grid>
        <Grid item xs>
          <Bids />
        </Grid>
        <Grid item xs>
          <AvgBidEcpm />
        </Grid>
        <Grid item xs>
          <Coverage />
        </Grid>
      </Grid>
    </Box>
  );
}
