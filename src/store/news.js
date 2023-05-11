import axios from "axios";
import { POLYGON_API_KEY } from "../secrets";

const news = (state = [], action) => {
  if (action.type === "FETCH_NEWS") {
    return action.news;
  }
  return state;
};

const header = {
  headers: { Authorization: `Bearer ${POLYGON_API_KEY}` },
};

export const fetchTickerNews = (stocksTicker) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.polygon.io/v2/reference/news?ticker=${stocksTicker}`,
      header
    );
    dispatch({ type: "FETCH_NEWS", news: response.data });
  };
};

export default news;
