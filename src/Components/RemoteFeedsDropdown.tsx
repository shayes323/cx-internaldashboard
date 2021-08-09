import { stateStoreContext } from "../StateStore";
import { useContext, useEffect, useState } from "react";
import { StateService } from "../StateService";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Accumulate } from "../AccumulateData";
import { Utils } from "../Utils";

export const RemoteFeedsDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [fieldVal, setFieldVal] = useState<string>("");


  var remotefeedsUrl =
    stateStore.start != "" && stateStore.end != ""
      ? Utils.CreateUrl(
        "remotefeeds",
        stateStore.start,
        stateStore.end,
        "none",
        "none",
        "all"
      )
      : "";


  useEffect(() => {
    var feedMap = new Map<string, number>();
    Utils.FetchList(remotefeedsUrl).then((res) =>
        res.forEach((element: any) => {
          feedMap.set(element.remotefeed, element.remotefeed_id);
        })
      )
      .then(() => (stateStore.remotefeedsMap = feedMap))
      .then(() => (stateStore.remotefeedsList = Array.from(feedMap.keys())));
  });

  function handleChange(e: any) {
    if (e.target.value == "all") {
      setFieldVal("all");
      runInAction(() => (stateStore.selectedRemotefeed = ""));
      return;
    }
    e.preventDefault();
    const key = e.target.value;
    console.log(e.target.value);
    console.log(stateStore.remotefeedsList[key]);
    setFieldVal(stateStore.remotefeedsList[key]);

    const pub = stateStore.remotefeedsList[key];
    const pubId = toJS(stateStore.remotefeedsMap).get(pub);
    runInAction(() => (stateStore.selectedRemotefeed = pubId));
  }

  return (
    <FormControl margin="normal">
      <Select
        style={{
          height: "35px",
          width: "200px",
          backgroundColor: "white",
          marginLeft: "-30px",
          textAlign: "center",

        }}
        defaultValue={fieldVal}
        displayEmpty={true}
        renderValue={() => (fieldVal != "" ? fieldVal : "all")}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value="all">all</MenuItem>
        {stateStore.remotefeedsList.map((remotefeed: any, key: any) => (
          <MenuItem value={key}>{remotefeed}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});