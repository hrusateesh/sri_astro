import "@babel/polyfill";
import "jquery";
import "bootstrap";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
//import "mdbreact/dist/css/mdb.css";

// import './custom.scss';
import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { CssBaseline } from "@material-ui/core";

import { store, configureFakeBackend, initFetch } from "Helpers";
import { Dashboard } from "./components";

initFetch();
configureFakeBackend(); // setup fake backend

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <CssBaseline />
        <Dashboard />
      </CookiesProvider>
    </Provider>,
    root
  );
}
