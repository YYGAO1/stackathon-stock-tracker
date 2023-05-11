import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist } from "../store";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { stocks, stockData } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, []);

  return (
    <>
      <ul>
        {stocks.map((stock) => {
          return (
            <li key={stock.ticker}>
              {stock.name}{" "}
              <Link className="tickerLink" to={`/tickers/${stock.ticker}`}>
                ({stock.ticker})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Watchlist;
