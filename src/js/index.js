//import react into the bundle
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import Home from "./component/home.jsx";
import injectContext from "./store/appContext.js";

//render your react application
ReactDOM.render(<Home />, document.querySelector("#app"));
