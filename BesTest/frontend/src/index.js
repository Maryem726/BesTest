import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import Payment from "components/pricing/Payment";

Modal.setAppElement("#root");

ReactDOM.render(
  <App />,
  // <Payment/>,
  document.getElementById("root")
);
