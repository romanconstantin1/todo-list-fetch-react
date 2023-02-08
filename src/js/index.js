//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import ToDoGen from "./component/todogen.jsx";

//render your react application
ReactDOM.render(<ToDoGen />, document.querySelector("#app"));
