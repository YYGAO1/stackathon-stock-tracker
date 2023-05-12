import axios from "axios";
import { POLYGON_API_KEY } from "../../secrets";

const ticker = (state = [], action) => {
  if (action.type === "FETCH_TICKER") {
    return action.ticker;
  }
  return state;
};

const header = {
  headers: { Authorization: `Bearer ${POLYGON_API_KEY}` },
};

export const fetchTicker = (ticker) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.polygon.io/v3/reference/tickers/${ticker}`,
      header
    );
    dispatch({ type: "FETCH_TICKER", ticker: response.data });
  };
};


// export const fetchDailyOpenClose = () => {
//   return async (dispatch) => {
//     const response = await axios.get(
//       `https://api.polygon.io/v1/open-close/${stocksTicker}/${date}`,
//       header
//     );
//     dispatch({ type: "FETCH_DAILY_OPEN_CLOSE", price: response.data });
//   };
// };

// export const fetchPreviousDay = (stocksTicker) => {
//   return async (dispatch) => {
//     const response = await axios.get(
//       `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/prev`,
//       header
//     );
//     dispatch({ type: "FETCH_PREVIOUS_DAY", price: response.data });
//   };
// };

export default ticker;
