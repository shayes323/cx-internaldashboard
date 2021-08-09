import { Box, Container, Grid } from "@material-ui/core";
import { Ctr } from "../Components/TopPanels/Publishers/Ctr";
import { Ecpm } from "../Components/TopPanels/Publishers/Ecpm";
import { EstimatedRevenue } from "../Components/TopPanels/Publishers/EstimatedRevenue";
import { FillRate } from "../Components/TopPanels/Publishers/FillRate";
import { Impressions } from "../Components/TopPanels/Publishers/Impressions";
import { Requests } from "../Components/TopPanels/Publishers/Requests";
import { AvgBidEcpm } from "../Components/TopPanels/RemoteFeeds/AvgBidEcpm";
import { Bids } from "../Components/TopPanels/RemoteFeeds/Bids";
import { Coverage } from "../Components/TopPanels/RemoteFeeds/Coverage";
import { GrossRevenue } from "../Components/TopPanels/RemoteFeeds/GrossRevenue";
import { RequestedBids } from "../Components/TopPanels/RemoteFeeds/RequestedBids";
import { WinRate } from "../Components/TopPanels/Publishers/WinRate";

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
