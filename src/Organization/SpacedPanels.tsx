import { Box, Container, Grid } from "@material-ui/core";
import { Ecpm } from "../Components/Ecpm";
import { EstimatedRevenue } from "../Components/EstimatedRevenue";
import { FillRate } from "../Components/FillRate";
import { Impressions } from "../Components/Impressions";
import { Requests } from "../Components/Requests";

export function SpacedPanels() {
    return (
    <Box p={2}>
    <Grid container direction="row" justify="space-evenly" spacing={4} style={{display: "flexInline", height: 110}}>
        <Grid item xs>
            <EstimatedRevenue />
        </Grid>
        <Grid item xs>
            <Requests />
        </Grid>
        <Grid item xs>
            <Impressions />
        </Grid>
        <Grid item xs>
            <FillRate />
        </Grid>
        <Grid item xs>
            <Ecpm />
        </Grid>
    </Grid>
    </Box>
    );
}