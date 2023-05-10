import axios from "axios";

const stocks = (state = [], action) => {
  if (action.type === "SET_WATCHLIST") {
    return action.watchlist;
  }
  if (action.type === "ADD_TO_LIST") {
    state = [...state, action.stock];
  }
  return state;
};

export const fetchWatchlist = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/watchlist", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_WATCHLIST", watchlist: response.data });
  };
};

export const addToWatchList = (stock) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      "/api/watchlist",
      { ticker: stock.ticker, name: stock.name },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "ADD_TO_LIST", stock: response.data });
  };
};

export default stocks;
