import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "../styles/stellar-paperwallet.scss";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <App />,
    document.querySelector("#root")
  );
});
