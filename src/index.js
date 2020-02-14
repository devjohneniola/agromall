import React from "react";
import ReactDOM from "react-dom";
// import { render } from "react-snapshot";
import AgroMall from "./AgroMall";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<AgroMall />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
