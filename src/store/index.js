import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import auth from "./auth";
import tickers from "./tickers";
import ticker from "./ticker";
import stockData from "./stockData";
import stocks from "./stocks";
import news from "./news";
import aggregates from "./aggregates";
import marketStatus from "./marketStatus";

const reducer = combineReducers({
  auth,
  tickers,
  ticker,
  stockData,
  stocks,
  news,
  aggregates,
  marketStatus,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./ticker";
export * from "./tickers";
export * from "./stockData";
export * from "./stocks";
export * from "./news";
export * from "./aggregates";
export * from "./marketStatus";
