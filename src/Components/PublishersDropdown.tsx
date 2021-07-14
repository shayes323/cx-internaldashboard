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
import { observer } from "mobx-react-lite";

export const PublishersDropDown: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);


  const publishersUrl =
    stateStore.start != "" && stateStore.end != ""
      ? "https://dev-app-api.catapultx.com/api/v1/reports/publishers/all/" +
        stateStore.start +
        "/" +
        stateStore.end
      : "";

  useEffect(() => {
    new StateService(publishersUrl)
      .Get()
      .then((jres: any) => jres.list)
      .then((data: any) => data.map((data: any) => [data.publisher_id, data.publisher]))
      .then((mapped) => (stateStore.publishersList = mapped))
      .then(() => console.log(stateStore.publishersList));
  });

  function handleChange(e) {
    e.preventDefault();
    const value = e.target.value;
    const zoneId = stateStore.publishersList[value][0];
    runInAction(() => (console.log(zoneId), stateStore.selectedPublisher = zoneId));
  }

  return (
    <FormControl margin="normal">
      <Select
        style={{height: "35px", width: "200px", backgroundColor: "white", marginLeft: "-30px"}}
        defaultValue={""}
        onChange={handleChange}
        variant="outlined"
      >
        {stateStore.publishersList.map((publisherTuple: any, key: any) => (
          <MenuItem value={key}>{publisherTuple[1]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
})
