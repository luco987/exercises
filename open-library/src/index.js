import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import data from "./data.json";

const headings = ["When", "Who", "Description"];

const props = {
  headings,
  data,
  title: "OpenLibrary Api"
};

ReactDOM.render(<App {...props} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
