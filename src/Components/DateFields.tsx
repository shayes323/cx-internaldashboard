import React, { useState, useContext, SyntheticEvent } from "react";
import {
  TextField,
} from "@material-ui/core";
import { stateStoreContext } from "../StateStore";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import "./TextFields.css";

export function StartDateField() {
  const stateStore = useContext(stateStoreContext);

  function HandleStartChange(e: any) {
    runInAction(() => (stateStore.start = e.target.value));
    stateStore.setToLocalStorage(stateStore.startKey, e.target.value);

  }

  return (
    <TextField
      className="TextFields"
      defaultValue={stateStore.start}
      size="small"
      margin="normal"
      onChange={HandleStartChange}
      id="startDate"
      required
      variant="outlined"
      type="date"
      style={{ width: "170px", backgroundColor: "white" }}
    />
  );
}

export function EndDateField() {
  const stateStore = useContext(stateStoreContext);

  function HandleEndChange(e: any) {
    runInAction(() => (stateStore.end = e.target.value));
    stateStore.setToLocalStorage(stateStore.endKey, e.target.value);


  }
  return (
    <span className="endDate">
      <TextField
        defaultValue={stateStore.end}
        size="small"
        onChange={HandleEndChange}
        id="endDate"
        required
        variant="outlined"
        type="date"
        margin="normal"
        style={{ width: "170px", backgroundColor: "white" }}
      />
    </span>
  );
}
