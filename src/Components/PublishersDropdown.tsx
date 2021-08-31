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
import { Utils } from "../Utils";

export const PublishersDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [fieldVal, setFieldVal] = useState<string>("all");
  console.log(fieldVal);

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
        res.forEach((element: any) => {
          pubMap.set(element.publisher, element.publisher_id);
        })
      )
      .then(() => (stateStore.publishersMap = pubMap))
      .then(() => (stateStore.publishersList = Array.from(pubMap.keys()).sort())).then(() => console.log(stateStore.publishersList));
  }, [stateStore.start, stateStore.end]);

  function handleChange(e: any) {
    if (e.target.value === "all") {
      setFieldVal("all");
      runInAction(() => stateStore.rfStatsFetching = [true, true, true, true, true, true]);
      runInAction(() => stateStore.pageLoading = [true, true, true]);
      runInAction(() => (stateStore.selectedPublisher = ""));
      runInAction(() => stateStore.selectedPublisherName = "all");
      stateStore.setToLocalStorage(stateStore.selectedPubNameKey, "all");
      return;
    }
    e.preventDefault();
    const key = e.target.value;
    setFieldVal(stateStore.publishersList[key]);
    runInAction(() => stateStore.rfStatsFetching = [true, true, true, true, true, true]);
    runInAction(() => stateStore.pageLoading = [true, true, true]);
    const pub = stateStore.publishersList[key];
    runInAction(() => stateStore.selectedPublisherName = pub);
    stateStore.setToLocalStorage(stateStore.selectedPubNameKey, stateStore.selectedPublisherName);
    const pubId = toJS(stateStore.publishersMap).get(pub);
    runInAction(() => (stateStore.selectedPublisher = pubId));
    console.log(stateStore.selectedPublisher)
    stateStore.setToLocalStorage(stateStore.selectedPubKey, stateStore.selectedPublisher);
  }

  return (
    <FormControl margin="normal">
      <Select
        style={{
          height: "35px",
          width: "200px",
          backgroundColor: "white",
          textAlign: "center",
        }}
        defaultValue={fieldVal}
        displayEmpty={true}
        renderValue={() => (stateStore.selectedPublisherName)}
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
