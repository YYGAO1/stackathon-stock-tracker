import axios from "axios";
import { STOCKDATA_API_KEY } from "../../secrets";

const stockData = (state = [], action) => {
  if (action.type === "FETCH_STOCK_QUOTE") {
    return action.quotes;
  }
  if (action.type === "FETCH_STOCK_QUOTE") {
    return action.trending;
  }
  return state;
};

export const fetchStockQuotes = (stocksTicker) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.stockdata.org/v1/data/quote?symbols=${stocksTicker}&api_token=${STOCKDATA_API_KEY}`
    );
    dispatch({ type: "FETCH_STOCK_QUOTE", quotes: response.data });
  };
};

export const fetchTrending = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.stockdata.org/v1/news/stats/trending?exchanges=nyse,nasdaq&api_token=${STOCKDATA_API_KEY}`
    );
    dispatch({ type: "FETCH_TRENDING", trending: response.data });
  };
};

export default stockData;
