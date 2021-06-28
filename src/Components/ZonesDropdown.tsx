import { stateStoreContext } from "../StateStore";
import { useContext, useEffect } from "react";
import { StateService } from "../StateService";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { runInAction } from "mobx";

export function ZonesDropDown() {
  const stateStore = useContext(stateStoreContext);

  function handleChange(e) {
    e.preventDefault();
    runInAction(() => (stateStore.selectedZone = e.target.value));
  }

  return (
    <FormControl required>
      <Select
        defaultValue={""}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "145px", height: "55px" }}
      >
        {stateStore.zonesList.map((zone: any, key: any) => (
          <MenuItem value={key}>{zone}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
