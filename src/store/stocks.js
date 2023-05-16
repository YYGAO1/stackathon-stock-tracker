import axios from "axios";

const stocks = (state = [], action) => {
  if (action.type === "SET_WATCHLIST") {
    return action.watchlist;
  }
  if (action.type === "ADD_TO_LIST") {
    state = [...state, action.stock];
  }
  if (action.type === "REMOVE_FROM_WATCHLIST") {
    return state.filter((_stock) => _stock.id !== action.stock.id);
  }

  if (action.type === "UPDATE_STOCKNOTE") {
    state = state.map((stock) => {
      if (stock.id === action.stock.id) {
        return action.stock;
      }
      return stock;
    });
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

export const updateStockNote = (stock) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(`/api/watchlist/edit/${stock.id}`, stock, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "UPDATE_STOCKNOTE", stock: response.data });
  };
};

export const addToWatchList = (stock) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post(
      `/api/watchlist/`,
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

export const removeFromWatchList = (stock) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/watchlist/${stock.id}`,
      {
        ticker: stock.ticker,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "REMOVE_FROM_WATCHLIST", stock: response.data });
  };
};

export default stocks;
