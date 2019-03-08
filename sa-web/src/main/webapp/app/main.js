import "@babel/polyfill";
import 'jquery'; 
import 'bootstrap';
import './custom.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, configureFakeBackend, initFetch } from './_helpers';
import { App } from './App';

initFetch();
configureFakeBackend(); // setup fake backend

ReactDOM.render(
  <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById("root")
);