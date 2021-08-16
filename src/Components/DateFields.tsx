import React, { useState, useContext, SyntheticEvent } from "react";
import {
  TextField,
  Button,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core";
import { Observable, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { stateStoreContext } from "../StateStore";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { StateService } from "../StateService";
import { useEffect } from "react";
import "./TextFields.css";
import { Utils } from "../Utils";

export function StartDateField() {
  const stateStore = useContext(stateStoreContext);

  function Valid() {
    if (Utils.GetYear(stateStore.start) > Utils.GetYear(stateStore.end)) {
      return false;
    } else if (
      Utils.GetYear(stateStore.start) === Utils.GetYear(stateStore.end) &&
      Utils.GetMonth(stateStore.start) > Utils.GetMonth(stateStore.end)
    ) {
      return false;
    } else if (
      Utils.GetYear(stateStore.start) === Utils.GetYear(stateStore.end) &&
      Utils.GetMonth(stateStore.start) === Utils.GetMonth(stateStore.end) &&
      Utils.GetDay(stateStore.start) > Utils.GetDay(stateStore.end)
    ) {
      return false;
    }
    return true;
  }

  function HandleStartChange(e: any) {
    runInAction(() => (stateStore.start = e.target.value));
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
      // error={Valid() === false}
    />
  );
}

export function EndDateField() {
  const stateStore = useContext(stateStoreContext);

  function HandleEndChange(e: any) {
    runInAction(() => (stateStore.end = e.target.value));
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
        //marginRight: "50px"
      />
    </span>
  );
}
