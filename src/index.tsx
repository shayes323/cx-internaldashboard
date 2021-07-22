import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Title } from "./Components/Title";
import { Home } from "./Home";
import { ZoneFeedData } from "./Components/ZoneFeedData";
import { RemoteFeedsDropDown } from "./Components/RemoteFeedsDropdown";
import { RemoteFeedsNavBar } from "./Components/RemoteFeedsNavBar";


ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

require('react-dom');
