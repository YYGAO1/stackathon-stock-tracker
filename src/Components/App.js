import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./LoginOrSignup";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTickers,
  fetchTicker,
  loginWithToken,
  fetchStockQuotes,
  fetchWatchlist,
  fetchTickerNews,
} from "../store";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Tickers from "./Tickers";
import Ticker from "./Ticker";
import Watchlist from "./Watchlist";
import Trending from "./TrendingStock";
import UpdateAcc from "./UpdateAcc";
import Profile from "./Profile";
import MarketStatus from "./MarketStatus";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTickers());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchWatchlist());
    }
  }, [auth]);

  const [stocksTicker, setTicker] = useState("");

  const getTicker = async (stocksTicker) => {
    await dispatch(fetchTicker(stocksTicker));
    await dispatch(fetchStockQuotes(stocksTicker));
    await dispatch(fetchTickerNews(stocksTicker));

    navigate(`/tickers/${stocksTicker}`);
    setTicker("");
  };

  // const getStocks = async () => {
  //   await dispatch(fetchTickers());
  //   navigate("/stocks/pg/1");
  // };

  return (
    <div>
      <h1>HODL</h1>
      {auth.id ? (
        <Home />
      ) : (
        <div className="loginSignupDiv">
          <Link to={"/login"} className="loginSignup">
            {" "}
            Login
          </Link>{" "}
          <span>or</span>{" "}
          <Link to={"/signup"} className="loginSignup">
            Sign Up
          </Link>
        </div>
      )}
      {
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link
              to="/tickers/pg/1"
              // refreshs the state
              onClick={async () => dispatch(fetchTickers())}
            >
              Stocks
            </Link>{" "}
            {!!auth.id && <Link to={"/watchlist"}>Watchlist</Link>}
            <span className="searchTicker">
              <input
                placeholder="ticker"
                value={stocksTicker}
                onChange={(ev) => setTicker(ev.target.value.toUpperCase())}
              />
              <button onClick={() => getTicker(stocksTicker)}>Enter</button>
            </span>
          </nav>
          <MarketStatus />

          <Routes>
            {" "}
            <Route path="/" element={<Trending />} />
            <Route path="/:account" element={<Login />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/tickers/pg/:num" element={<Tickers />} />
            <Route path="/tickers/:stocksTicker" element={<Ticker />} />
            {!!auth.id && <Route path="/update" element={<UpdateAcc />} />}{" "}
            <Route path="/users/:authId" element={<Profile />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
