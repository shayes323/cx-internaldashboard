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

export const PublishersDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  const [fieldVal, setFieldVal] = useState<string>("");

  var publishersUrl =
    stateStore.start != "" && stateStore.end != ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
        stateStore.start +
        "/" +
        stateStore.end
      : "";


  useEffect(() => {
    var pubMap = new Map<string, number>();
    new StateService(publishersUrl)
      .Get()
      .then((jres: any) => jres.list)
      .then((res) =>
        res.forEach((element) => {
          pubMap.set(element.publisher, element.publisher_id);
        })
      )
      .then(() => (stateStore.publishersMap = pubMap))
      .then(() => (stateStore.publishersList = Array.from(pubMap.keys())));
  });

  function handleChange(e) {
    if (e.target.value == "all") {
      setFieldVal("all");
      runInAction(() => (stateStore.selectedPublisher = ""));
      return;
    }
    //how do I select the publisher
    e.preventDefault();
    const key = e.target.value;
    console.log(e.target.value);
    console.log(stateStore.publishersList[key]);
    setFieldVal(stateStore.publishersList[key]);

    const pub = stateStore.publishersList[key];
    const pubId = toJS(stateStore.publishersMap).get(pub);
    runInAction(() => (stateStore.selectedPublisher = pubId)); //getting correct publisherid
    console.log(stateStore.selectedPublisher);
  }

  function handleClick() {
    runInAction(() => (stateStore.selectedPublisher = ""));
    // runInAction(() => stateStore.publishersList = []);
    // runInAction(() => stateStore.publishersMap = new Map());
  }

  function handleRenderValue(e) {
    setFieldVal(e.currentTarget);
    return fieldVal;
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



