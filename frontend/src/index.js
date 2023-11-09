import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";

import App from "./App";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  rootElement
);
