import { Box, Container, Grid } from "@material-ui/core";
import { Ctr } from "../Components/TopPanels/Ctr";
import { Ecpm } from "../Components/TopPanels/Ecpm";
import { EstimatedRevenue } from "../Components/TopPanels/EstimatedRevenue";
import { FillRate } from "../Components/TopPanels/FillRate";
import { Impressions } from "../Components/TopPanels/Impressions";
import { Requests } from "../Components/TopPanels/Requests";
import { WinRate } from "../Components/TopPanels/WinRate";

export function PublishersSpacedPanels() {
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
          <EstimatedRevenue />
        </Grid>
        <Grid item xs>
          <Requests />
        </Grid>
        <Grid item xs>
          <FillRate />
        </Grid>
        <Grid item xs>
          <Impressions />
        </Grid>
        <Grid item xs>
          <WinRate />
        </Grid>
        <Grid item xs>
          <Ecpm />
        </Grid>
        <Grid item xs>
          <Ctr />
        </Grid>
      </Grid>
    </Box>
  );
}
