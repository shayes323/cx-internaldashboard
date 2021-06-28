import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Title } from "./Components/Title";
import { Home } from "./Home";
import { DropDown } from "./Components/DropDown";
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { ZonesDropDown } from './Components/ZonesDropdown';
import { NavBar } from "./Components/NavBar";


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
