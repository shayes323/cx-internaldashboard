import React, { useState, useContext, SyntheticEvent } from "react";
import { TextField, Button } from "@material-ui/core";
import { Observable, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { stateStoreContext } from "../StateStore";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { StateService } from "../StateService";
import { useEffect } from "react";
import { isConstructorDeclaration } from "typescript";
import { DropDown } from "./DropDown";

export function TextFields() {
  const stateStore = useContext(stateStoreContext);

  function HandleStartChange(e: any) {
    runInAction(() => (stateStore.start = e.target.value));
  }

  function HandleEndChange(e: any) {
    runInAction(() => (stateStore.end = e.target.value));
  }



  return (
    <span>
      <TextField
        onChange={HandleStartChange}
        id="startDate"
        required
        helperText="Start Date"
        variant="filled"
        color="secondary"
        type="date"
      />{" "}
      <TextField
        onChange={HandleEndChange}
        id="endDate"
        required
        helperText="End Date"
        variant="filled"
        color="secondary"
        type="date"
      />
      <DropDown />
    </span>
  );
}
