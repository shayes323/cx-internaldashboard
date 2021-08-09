import { Grid } from "@material-ui/core";
import { PubDailyChart } from "../Components/PubDailyChart";
import { PieChart } from "../Components/PieChart";
import { ZoneFeedData } from "../Components/ZoneFeedData";

export function PublishersChartsPlacement() {
  return (
    <div>
      <div>
        <Grid
          container
          direction="row"
          style={{ display: "flexInline", height: 10 }}
        >
          <Grid item xs={12}>
            <PubDailyChart />
          </Grid>
          <Grid item xs={7}>
            <ZoneFeedData />
          </Grid>
          <Grid item xs={5}>
            <PieChart />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
