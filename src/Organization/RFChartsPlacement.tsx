import { Grid, Paper } from "@material-ui/core";
import { DailyChart } from "../Components/DailyChart";
import { PieChart } from "../Components/PieChart";
import { ZoneFeedData } from "../Components/ZoneFeedData";
import { RemoteFeedData } from "../Components/RemoteFeedData";

export function RFChartsPlacement() {
  return (
    <div>
      <div>
        <Grid
          container
          direction="row"
          style={{ display: "flexInline", height: 10 }}
        >
          <Grid item xs={12}>
            <DailyChart />
          </Grid>
          <Grid item xs={7}>
            <RemoteFeedData />
          </Grid>
          <Grid item xs={5}>
            <PieChart />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
