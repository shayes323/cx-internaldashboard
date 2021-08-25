import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { stateStoreContext } from "../StateStore";
import { useContext, useState, createRef, forwardRef } from "react";
import { runInAction } from "mobx";
import { Link, useHistory } from "react-router-dom";

export function PageSelectDropDown() {
  const stateStore = useContext(stateStoreContext);
  const [page, setPage] = useState("publishers");

  const history = useHistory();

  const handleChange = (e: any) => {
    console.log(e.target.value);
    runInAction(() => stateStore.page = e.target.value);
    runInAction(() => stateStore.pieChartReload = false);
    runInAction(() => stateStore.dailyChartReload = false);
    runInAction(() => stateStore.pageLoading = [true, true, true]);
    let path = e.target.value as string;
    history.push(path);
  
  };

  return (
    <div>
      <FormControl required margin="normal">
        <Select
          style={{
            height: "35px",
            backgroundColor: "white",
          }}
          displayEmpty
          onChange={handleChange}
          value={stateStore.page}
          renderValue={() => stateStore.page === "publishers" ? "publishers" : "remote feeds"}
          variant="outlined"
        >
          <Link to="/publishers">
            <MenuItem  value="publishers" style={{ fontSize: 15 }}>
              publishers
            </MenuItem>
          </Link>
          <Link to="/remotefeeds">
            <MenuItem value="remote feeds" style={{ fontSize: 15 }}>
              remote feeds
            </MenuItem>
          </Link>
        </Select>
      </FormControl>
    </div>
  );
}