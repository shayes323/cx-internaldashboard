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
import { useContext, useState, createRef, forwardRef, useEffect } from "react";
import { runInAction } from "mobx";
import { Link, useHistory, useLocation } from "react-router-dom";

export function PageSelectDropDown() {
  const stateStore = useContext(stateStoreContext);

  const history = useHistory();



  const handleChange = () => {
    console.log(stateStore.page);
    runInAction(() => stateStore.pieChartReload = false);
    runInAction(() => stateStore.dailyChartReload = false);
    runInAction(() => stateStore.pageLoading = [true, true, true]);
    
    let path = stateStore.page === "remote feeds" ? "/remotefeeds" : "/publishers";
    stateStore.setToLocalStorage(stateStore.currentPageKey, stateStore.page);
    history.push(path);
    console.log(history);
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
          <Link to={{pathname: "/publishers", state: {value: "publishers"}}}>
            <MenuItem  value="publishers" style={{ fontSize: 15 }} onClick={() => stateStore.page = "publishers"}>
              publishers
            </MenuItem>
          </Link>
          <Link to={{pathname: "/remotefeeds", state: {value: "remote feeds"}}}>
            <MenuItem value="remote feeds" style={{ fontSize: 15 }} onClick={() => stateStore.page = "remote feeds"}>
              remote feeds
            </MenuItem>
          </Link>
        </Select>
      </FormControl>
    </div>
  );
}