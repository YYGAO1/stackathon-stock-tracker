import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, removeFromWatchList } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { stocks, stockData } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const remove = (stock) => {
    dispatch(removeFromWatchList(stock));
    navigate("/watchlist");
  };

  return (
    <>
      <ul>
        {stocks.map((stock) => {
          return (
            <li key={stock.ticker}>
              {stock.name}{" "}
              <Link className="tickerLink" to={`/tickers/${stock.ticker}`}>
                ({stock.ticker})
              </Link>{" "}
              <button onClick={() => remove(stock)}>x</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Watchlist;
