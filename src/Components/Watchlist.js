import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, removeFromWatchList, updateStockNote } from "../store";
import { Link, useNavigate } from "react-router-dom";
import StockNote from "./StockNote";

const Watchlist = () => {
  const { stocks, stockData } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const remove = (stock) => {
    dispatch(removeFromWatchList(stock));
    navigate("/watchlist");
  };

  const update = (stock) => {
    navigate(`/watchlist/edit/${stock.id}`);
  };

  return (
    <>
      <ul>
        {stocks
          ? stocks.map((stock) => {
              return (
                <li key={stock.ticker}>
                  {stock.name}{" "}
                  <Link className="tickerLink" to={`/tickers/${stock.ticker}`}>
                    ({stock.ticker})
                  </Link>{" "}
                  <button onClick={() => remove(stock)}>x</button>
                  <ul>
                    {stock.note ? (
                      <li key={stock.note}>
                        {stock.note}{" "}
                        <button onClick={() => update(stock)}>edit note</button>
                      </li>
                    ) : (
                      <button onClick={() => update(stock)}>add note</button>
                    )}
                  </ul>
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default Watchlist;
