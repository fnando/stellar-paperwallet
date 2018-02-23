import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "../styles/stellar-paperwallet.scss";

document.addEventListener("DOMContentLoaded", () => {
  const loadingContainer = document.querySelector(".loading");
  loadingContainer.classList.add("hide");

  setTimeout(() => loadingContainer.parentNode.removeChild(loadingContainer), 1000);

  ReactDOM.render(
    <App />,
    document.querySelector("#root")
  );
});
