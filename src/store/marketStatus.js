import axios from "axios";
import { POLYGON_API_KEY } from "../../secrets";

const marketStatus = (state = [], action) => {
  if (action.type === "FETCH_MARKET_STATUS") {
    return action.marketStatus;
  }
  return state;
};

const header = {
  headers: { Authorization: `Bearer ${POLYGON_API_KEY}` },
};

export const fetchMarketStatus = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.polygon.io/v1/marketstatus/now`,
      header
    );
    dispatch({ type: "FETCH_MARKET_STATUS", marketStatus: response.data });
  };
};

export default marketStatus;
