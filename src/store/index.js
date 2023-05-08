import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import tickers, { ticker } from "./tickers";

const reducer = combineReducers({
  auth,
  tickers,
  ticker,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./tickers";
