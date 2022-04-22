import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlayCircle,
  faWeightHanging,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlayCircle, faStopCircle, faWeightHanging);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
