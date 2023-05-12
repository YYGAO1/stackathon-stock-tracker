import axios from "axios";
import { POLYGON_API_KEY } from "../../secrets";

const aggregates = (state = [], action) => {
  if (action.type === "FETCH_AGGREGATES") {
    return action.aggregates;
  }
  return state;
};

const header = {
  headers: { Authorization: `Bearer ${POLYGON_API_KEY}` },
};

export const fetchAggregates = (stock) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${stock.stocksTicker}/range/${stock.multiplier}/${stock.timespan}/${stock.from}/${stock.to}`,
      header
    );
    dispatch({ type: "FETCH_AGGREGATES", aggregates: response.data.results });
  };
};

export default aggregates;
