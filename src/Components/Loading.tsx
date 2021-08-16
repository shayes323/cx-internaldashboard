import { observer } from "mobx-react-lite";
import { stateStoreContext } from "../StateStore";
import { useContext } from "react";
import { CircularProgress } from "@material-ui/core";




export const Loading: any = observer<any, any>(() => {
    const stateStore = useContext(stateStoreContext);
        return <CircularProgress />;
})