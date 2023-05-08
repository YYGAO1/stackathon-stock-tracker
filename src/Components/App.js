import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickers, fetchTicker, loginWithToken } from "../store";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Tickers from "./Tickers";
import Ticker from "./Ticker";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginWithToken());
    dispatch(fetchTickers());
  }, []);

  const [_ticker, setTicker] = useState("");

  const getTicker = async (_ticker) => {
    await dispatch(fetchTicker(_ticker));
    navigate(`/tickers/${_ticker}`);
    setTicker("");
  };

  // const getStocks = async () => {
  //   await dispatch(fetchTickers());
  //   navigate("/stocks/pg/1");
  // };

  return (
    <div>
      <h1>Diamond Hands</h1>
      {auth.id ? <Home /> : <Login />}

      {
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link
              to="/tickers/pg/1"
              // refreshes the state
              onClick={async () => dispatch(fetchTickers())}
            >
              Stocks
            </Link>
          </nav>
          <input
            placeholder="ticker"
            value={_ticker}
            onChange={(ev) => setTicker(ev.target.value)}
          />
          <button onClick={() => getTicker(_ticker)}>Enter</button>
          <Routes>
            {" "}
            <Route path="/tickers/pg/:num" element={<Tickers />} />
            <Route path="/tickers/:ticker" element={<Ticker />} />
          </Routes>
        </div>
      }
    </div>
  );
};

export default App;
