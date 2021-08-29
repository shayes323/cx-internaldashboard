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
  const [page, setPage] = useState("publishers");


  const history = useHistory();



  const handleChange = (e: any) => {




    // props.location = typeof(props.location.state.name) === "undefined" ? "publishers" : props.location.state.name;

    // if (props.location.state.value === "remote feeds") {
    //   runInAction(() => stateStore.page = "remote feeds");
    // }
    // else if (props.location.state.value === "publishers") {
    //   runInAction(() => stateStore.page = "publishers");
    // }
    // runInAction(() => stateStore.page = e.target.value);
    console.log(stateStore.page);
    runInAction(() => stateStore.pieChartReload = false);
    runInAction(() => stateStore.dailyChartReload = false);
    runInAction(() => stateStore.pageLoading = [true, true, true]);
    // let path = e.target.value as string;
    let path = stateStore.page === "remote feeds" ? "/remotefeeds" : "/publishers";
    history.push(path);
    console.log(history);
  };


  // useEffect(() => {
  //   console.log("page effect hit");
  //   window.addEventListener("onbeforeunload", KeepTabCorrect);
  //   console.log(stateStore.page);
  //   return () => {
  //     window.removeEventListener("onbeforeunload", KeepTabCorrect);
  //   };
  // }, []);

  // window.addEventListener("beforeunload", KeepTabCorrect());



  function KeepTabCorrect() {
    console.log("hitting event listener");
    if (window.location.pathname === "/remotefeeds") {
      console.log("saying it's rf page");
      stateStore.page = "remote feeds"
    }
    else if (window.location.pathname === "/publishers") {
      console.log("saying it's pub page");
      stateStore.page = "publishers"
    }
  }



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