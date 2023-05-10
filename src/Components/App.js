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
} from "../store";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Tickers from "./Tickers";
import Ticker from "./Ticker";
import Watchlist from "./Watchlist";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTickers());
    dispatch(fetchWatchlist());
  }, []);

  const [stocksTicker, setTicker] = useState("");

  const getTicker = async (stocksTicker) => {
    await dispatch(fetchTicker(stocksTicker));
    await dispatch(fetchStockQuotes(stocksTicker));
    navigate(`/tickers/${stocksTicker}`);
    setTicker("");
  };

  // const getStocks = async () => {
  //   await dispatch(fetchTickers());
  //   navigate("/stocks/pg/1");
  // };

  return (
    <div>
      <h1>Diamond Hands</h1>
      {auth.id ? (
        <Home />
      ) : (
        <>
          <Link to={"/login"}> Login</Link> <span>or</span>{" "}
          <Link to={"/signup"}>Sign Up</Link>
        </>
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
          </nav>
          <input
            placeholder="ticker"
            value={stocksTicker}
            onChange={(ev) => setTicker(ev.target.value.toUpperCase())}
          />
          <button onClick={() => getTicker(stocksTicker)}>Enter</button>
          <Routes>
            {" "}
            <Route path="/:account" element={<Login />} />
            {/* <Route path="/signup" element={<Login />} /> */}
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/tickers/pg/:num" element={<Tickers />} />
            <Route path="/tickers/:stocksTicker" element={<Ticker />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
