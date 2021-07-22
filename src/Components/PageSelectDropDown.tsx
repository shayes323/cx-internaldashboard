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

  // function handleChange(e: any) {
  //   e.preventDefault();
  //   setValue(e.target.value);
  //   runInAction(() => (stateStore.reportType = e.target.value));
  //   }

  const history = useHistory();

  const handleChange = (e) => {
    // if (
    //   value === "publishers"
    // ) {
    //   setValue("remote feeds");
      // runInAction(() => (stateStore.reportType = "remote feeds"));
    // }
    // if (value === "remote feeds") {
    //   setValue("publishers");
    //   runInAction(() => (stateStore.reportType = "publishers"));
    // }
    console.log(e.target.value);
    runInAction(() => stateStore.page = e.target.value);
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
            marginLeft: "-35px",
          }}
          displayEmpty
          onChange={handleChange}
          value={stateStore.page}
          renderValue={() => stateStore.page === "publishers" ? "publishers" : "remote feeds"}
          variant="outlined"
        >
          <Link value="publishers" to="/publishers">
            <MenuItem  value="publishers" style={{ fontSize: 15 }}>
              publishers
            </MenuItem>
          </Link>
          <Link value="remote feeds" to="/remotefeeds">
            <MenuItem value="remote feeds" style={{ fontSize: 15 }}>
              remote feeds
            </MenuItem>
          </Link>
        </Select>
      </FormControl>
    </div>
  );
}

//     <FormControl>
//         <TextField
//         select
//         label="Report Type"
//         id="type">

//         <MenuItem>zones</MenuItem>
//         <MenuItem>publishers</MenuItem>
//         <MenuItem>remotefeeds</MenuItem>
//         </TextField>

//     </FormControl>

//   );
// }
