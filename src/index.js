import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import catalogReducer from "./reducers/catalogReduser";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import createSagaMiddleware from "redux-saga";
import { loadDogWatcher } from "./actions/saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  catalog: catalogReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(loadDogWatcher);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("index")
);
