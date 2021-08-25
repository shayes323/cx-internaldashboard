import { Grid } from "@material-ui/core";
import { DailyChart } from "../Components/DailyChart";
import { PieChart } from "../Components/PieChart";
import { ZoneFeedData } from "../Components/ZoneFeedData";
import LoadingOverlay from "react-loading-overlay";
import { stateStoreContext } from "../StateStore";
import { useContext } from "react";

export function PublishersChartsPlacement() {
  const stateStore = useContext(stateStoreContext);

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
