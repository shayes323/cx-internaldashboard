import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField
} from "@material-ui/core";
import { stateStoreContext } from "../StateStore";
import { useContext, useState, createRef, forwardRef } from "react";
import { runInAction } from "mobx";
import { setConstantValue } from "typescript";


export function DropDown() {
  const stateStore = useContext(stateStoreContext);
  const [value, setValue] = useState('zones');

  function handleChange(e: any) {
    e.preventDefault();
    setValue(e.target.value);
    runInAction(() => (stateStore.reportType = e.target.value));
  }

  return (
    <FormControl required>
      <Select
        defaultValue={''}
        onChange={handleChange}
      
        // value={stateStore.reportType}
        variant="outlined"
        style={{ width: "145px", height: "55px" }}
      >
        <MenuItem value={'zones'}>zones</MenuItem>
        <MenuItem value={'publishers'}>publishers</MenuItem>
        <MenuItem value={'remotefeeds'}>remote feeds</MenuItem>
      </Select>
    </FormControl>
  )
}





    
//     <FormControl>
//         <TextField
//         select
//         label="Report Type"
//         id="type">

//         <MenuItem>zones</MenuItem>
//         <MenuItem>publishers</MenuItem>
//         <MenuItem>remotefeeds</MenuItem>
//         </TextField>

//     </FormControl>

//   );
// }



