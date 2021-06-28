import { AppBar, makeStyles, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export function NavBar() {
  const useStyles = makeStyles((theme) => ({
    title: {
      color: "white",
      textAlight: "left",
      height: 45,
    },
  }));
  const styles = useStyles();
  return (
    <AppBar position="static">
      <div className="title">
        <Typography variant="h3" className={styles.title}>
          CX Dashboard
        </Typography>
        <Typography variant="h6">
            <Button>
              <Link to="/">Publishers</Link>
            </Button>
            <Button>
              <Link to="/RemoteFeeds">RemoteFeeds</Link>
            </Button>
        </Typography>
      </div>
    </AppBar>
  );
}
