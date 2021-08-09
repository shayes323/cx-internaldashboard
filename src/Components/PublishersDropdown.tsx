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

export const PublishersDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [fieldVal, setFieldVal] = useState<string>("");

  var publishersUrl =
    stateStore.start != "" && stateStore.end != ""
      ? Utils.CreateUrl(
          "publishers",
          stateStore.start,
          stateStore.end,
          "none",
          "none",
          "all"
        )
      : "";

  useEffect(() => {
    var pubMap = new Map<string, number>();
    Utils.FetchList(publishersUrl)
      .then((res) =>
        res.forEach((element) => {
          pubMap.set(element.publisher, element.publisher_id);
        })
      )
      .then(() => (stateStore.publishersMap = pubMap))
      .then(() => (stateStore.publishersList = Array.from(pubMap.keys())));
  }, [stateStore.start, stateStore.end]);

  function handleChange(e: any) {
    if (e.target.value == "all") {
      setFieldVal("all");
      runInAction(() => (stateStore.selectedPublisher = ""));
      return;
    }
    e.preventDefault();
    const key = e.target.value;
    console.log(e.target.value);
    console.log(stateStore.publishersList[key]);
    setFieldVal(stateStore.publishersList[key]);

    const pub = stateStore.publishersList[key];
    const pubId = toJS(stateStore.publishersMap).get(pub);
    runInAction(() => (stateStore.selectedPublisher = pubId));
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

        {stateStore.publishersList.map((publisher: any, key: any) => (
          <MenuItem value={key}>{publisher}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
