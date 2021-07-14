import { runInAction } from "mobx";
import { stateStoreContext } from "./StateStore";
import { useContext } from "react";

export class StateService {
  public url: string;
  public data: any;

  constructor(url: string) {
    this.url = url;
  }

  async Get() {
    return await fetch(this.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
  }
}
