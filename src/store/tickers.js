import axios from "axios";
import { API_KEY } from "../secrets";

const tickers = (state = [], action) => {
  if (action.type === "FETCH_TICKERS") {
    return action.tickers;
  }
  return state;
};

export const ticker = (state = [], action) => {
  if (action.type === "FETCH_TICKER") {
    return action.ticker;
  }
  return state;
};

export const fetchTickers = () => {
  return async (dispatch) => {
    const response = await axios.get(
      "https://api.polygon.io/v3/reference/tickers",
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    dispatch({ type: "FETCH_TICKERS", tickers: response.data });
  };
};

export const fetchNextPage = (nextPage) => {
  return async (dispatch) => {
    const response = await axios.get(nextPage, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    dispatch({ type: "FETCH_TICKERS", tickers: response.data });
  };
};

export const fetchTicker = (_ticker) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.polygon.io/v3/reference/tickers/${_ticker}`,
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    dispatch({ type: "FETCH_TICKER", ticker: response.data });
  };
};

export default tickers;
