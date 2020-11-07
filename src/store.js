import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
// import { createLogger } from "redux-logger";

import reducer from "./reducers";

const middleware = applyMiddleware(
    createPromise(),
    thunk
    // createLogger()
);

const store = createStore(reducer, middleware);

// store.subscribe(() => console.log('state changed', store.getState()));

export default store;
