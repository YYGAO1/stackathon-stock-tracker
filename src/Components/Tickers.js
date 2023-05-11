import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addToWatchList,
  fetchNextPage,
  fetchStockQuotes,
  fetchTicker,
  fetchTickers,
} from "../store";
import { fetchTickerNews } from "../store/news";

const Tickers = () => {
  const { tickers } = useSelector((state) => state);
  const { num } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchTickers());
  // }, []);

  const nextPage = async (nextPage) => {
    await dispatch(fetchNextPage(nextPage));
    navigate(`/tickers/pg/${num * 1 + 1}`);
  };

  const getTicker = async (stocksTicker) => {
    await dispatch(fetchTicker(stocksTicker));
    await dispatch(fetchStockQuotes(stocksTicker));
    await dispatch(fetchTickerNews(stocksTicker));

    // navigate(`/tickers/${stocksTicker}`);
  };

  const addToList = async (stock) => {
    await dispatch(addToWatchList(stock));
  };

  return (
    <>
      <ul>
        {tickers
          ? tickers.results.map((stock) => {
              return (
                <li key={stock.ticker}>
                  <Link
                    to={`/tickers/${stock.ticker}`}
                    onClick={() => getTicker(stock.ticker)}
                  >
                    {stock.name}{" "}
                  </Link>{" "}
                  ({stock.ticker}){" "}
                  <button onClick={() => addToList(stock)}>
                    Add to WatchList
                  </button>
                </li>
              );
            })
          : null}
        {/* <Link to={`/tickers/pg/${num * 1 + 1}`}>Next Page</Link> */}
        <button onClick={() => nextPage(tickers.next_url)}>Next Page</button>
      </ul>
    </>
  );
};
export default Tickers;
