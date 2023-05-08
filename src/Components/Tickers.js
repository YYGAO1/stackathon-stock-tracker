import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchNextPage, fetchTicker, fetchTickers } from "../store";

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
  const getTicker = async (ticker) => {
    await dispatch(fetchTicker(ticker));
    navigate(`/tickers/${ticker}`);
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
                    {stock.name} <button>add to watchlist</button>
                  </Link>{" "}
                  ({stock.ticker})
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
