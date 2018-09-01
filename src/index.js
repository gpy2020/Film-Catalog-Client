import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import catalogReducer from "./reducers/catalogReduser";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  catalog: catalogReducer
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("index")
);
