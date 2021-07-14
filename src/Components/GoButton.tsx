import React from "react";
import { Button } from "@material-ui/core";
import { stateStoreContext } from "../StateStore";
import { useContext } from "react";
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";

export const GoButton = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  function HandleClick(e: any) {
    runInAction(() => (stateStore.clickedButton = true));
  }

  return (
    <Button
      onClick={HandleClick}
      style={{ width: "56px", height: "55px" }}
      variant="contained"
      color="secondary"
    >
      Go
    </Button>
  );
})
