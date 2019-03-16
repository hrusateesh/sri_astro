import "@babel/polyfill";
import "jquery";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// import './custom.scss';

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store, configureFakeBackend, initFetch } from "./_helpers";
import { App } from "./App";

initFetch();
configureFakeBackend(); // setup fake backend

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
}
