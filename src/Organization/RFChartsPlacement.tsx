import { Grid } from "@material-ui/core";
import { PubDailyChart } from "../Components/PubDailyChart";
import { DeviceBreakdown } from "../Components/DeviceBreakdown";
import { ZoneFeedData } from "../Components/ZoneFeedData";
import { RFDailyChart } from "../Components/RFDailyChart";
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
            <RFDailyChart />
          </Grid>
          <Grid item xs={7}>
            <RemoteFeedData />
          </Grid>
          <Grid item xs={5}>
            <DeviceBreakdown />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
