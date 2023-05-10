import axios from "axios";
import { POLYGON_API_KEY } from "../secrets";

const tickers = (state = [], action) => {
  if (action.type === "FETCH_TICKERS") {
    return action.tickers;
  }
  return state;
};

const header = {
  headers: { Authorization: `Bearer ${POLYGON_API_KEY}` },
};

export const fetchTickers = () => {
  return async (dispatch) => {
    const response = await axios.get(
      "https://api.polygon.io/v3/reference/tickers",
      header
    );
    dispatch({ type: "FETCH_TICKERS", tickers: response.data });
  };
};

export const fetchNextPage = (nextPage) => {
  return async (dispatch) => {
    const response = await axios.get(nextPage, header);
    dispatch({ type: "FETCH_TICKERS", tickers: response.data });
  };
};

export default tickers;
