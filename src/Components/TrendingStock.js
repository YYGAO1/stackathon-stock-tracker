import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockQuotes, fetchTrending } from "../store";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const Trending = () => {
  const { stockData } = useSelector((state) => state);

  const dispatch = useDispatch();

  const today = dayjs();
  const from = today.subtract(1, "day").format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(fetchTrending(from));
  }, []);

  const data = stockData.data ? stockData.data : null;

  return (
    <>
      <h1>Trending past 24 hrs</h1>
      <div>
        <ul>
          {data
            ? data.map((stock) => {
                return (
                  <li key={stock.key}>
                    <Link to={`/tickers/${stock.key}`} className="tickerLink">
                      {stock.key}
                    </Link>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </>
  );
};

export default Trending;
