import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //Thunk contains async logic (commonly used for data fetching)

import reducers from "../../client/src/reducers"; //Reducers are functions that take the current state and an action as arguments, and return a new state result. In other words, (state, action) => newState

import App from "../../client/src/App";

const store = createStore(reducers, compose(applyMiddleware(thunk))); //Add thunk midlleware to redux store. 

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
