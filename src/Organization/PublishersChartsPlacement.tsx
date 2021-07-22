import { Grid } from "@material-ui/core";
import { PublishersDailyImpressionsChart } from "../Components/PublishersDailyImpressionsChart";
import { DeviceBreakdown } from "../Components/DeviceBreakdown";
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
            <PublishersDailyImpressionsChart />
          </Grid>
          <Grid item xs={7}>
            <ZoneFeedData />
          </Grid>
          <Grid item xs={5}>
            <DeviceBreakdown />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
