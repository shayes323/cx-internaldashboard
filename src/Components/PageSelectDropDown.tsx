import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import { stateStoreContext } from "../StateStore";
import { useContext, useState, createRef, forwardRef } from "react";
import { runInAction } from "mobx";
import {Link } from "react-router-dom";


export function PageSelectDropDown() {
  const stateStore = useContext(stateStoreContext);
  const [value, setValue] = useState('zones');

  function handleChange(e: any) {
    e.preventDefault();
    setValue(e.target.value);
    runInAction(() => (stateStore.reportType = e.target.value));
  }

 
  const styles = {
    resize: {
      fontSize: 20
    }
  }

  return (
    <div>
    <FormControl required margin="normal">
      <Select
        style={{height: "35px", backgroundColor: "white", marginLeft: "-35px" }}
        displayEmpty
        renderValue={() => "publishers"}
        defaultValue={'publishers'}
        onChange={handleChange}
        variant="outlined"
        
      >
        <Link to="/publishers">
        <MenuItem value={'publishers'} style={{fontSize: 15}}>publishers</MenuItem>
        </Link>
        <Link to="/remotefeeds">
        <MenuItem value={'remotefeeds'} style={{fontSize: 15}}>remote feeds</MenuItem>
        </Link>
      </Select>
    </FormControl>
    </div>
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



