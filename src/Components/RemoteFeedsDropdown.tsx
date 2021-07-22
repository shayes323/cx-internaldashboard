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
import { runInAction, toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Accumulate } from "../AccumulateData";

export const RemoteFeedsDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);

  var remotefeedsUrl =
    stateStore.start != "" && stateStore.end != ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/remotefeeds/all/" +
        stateStore.start +
        "/" +
        stateStore.end
      : "";


  useEffect(() => {
    var feedMap = new Map<string, number>();
    new StateService(remotefeedsUrl)
      .Get()
      .then((jres: any) => jres.list)
      .then((res) =>
        res.forEach((element) => {
          feedMap.set(element.remotefeed, element.remotefeed_id);
        })
      )
      .then(() => (stateStore.remotefeedsMap = feedMap))
      .then(() => (stateStore.remotefeedsList = Array.from(feedMap.keys())));
  });

  function handleChange(e) {
    //how do I select the publisher
    e.preventDefault();
    const key = e.target.value;
    const feed = stateStore.remotefeedsList[key];
    const feedId = toJS(stateStore.remotefeedsMap).get(feed);
    runInAction(() => (stateStore.selectedRemotefeed = feedId)); //getting correct publisherid
    console.log(stateStore.selectedRemotefeed);
  }

  function handleClick() {
    runInAction(() => stateStore.selectedRemotefeed = "");
    // runInAction(() => stateStore.publishersList = []);
    // runInAction(() => stateStore.publishersMap = new Map());
  }

  return (
    <FormControl margin="normal">
      <Select
        style={{
          height: "35px",
          width: "200px",
          backgroundColor: "white",
          marginLeft: "-30px",
        }}
        defaultValue={""}
        displayEmpty={true}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem onClick={handleClick} value="">all</MenuItem>
        {stateStore.remotefeedsList.map((remotefeed: any, key: any) => (
          <MenuItem value={key}>{remotefeed}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});