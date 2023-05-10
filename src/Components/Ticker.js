import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToWatchList, fetchStockQuotes, fetchTicker } from "../store";

const Ticker = () => {
  const { ticker, stockData } = useSelector((state) => state);
  const { stocksTicker } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTicker(stocksTicker));
    dispatch(fetchStockQuotes(stocksTicker));
  }, []);

  const tickerData = ticker.results ? ticker.results : "";
  const address = tickerData.address ? tickerData.address : "";
  const _stockData = stockData ? stockData : null;

  const addToList = async (stock) => {
    await dispatch(addToWatchList(stock));
  };

  return (
    <>
      {/* <pre>{JSON.stringify(tickerData, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(stockData, null, 2)}</pre> */}
      {tickerData.homepage_url ? (
        <h1>
          {/* {tickerData.branding.icon_url} */}
          <a href={`${tickerData.homepage_url}`}>{tickerData.name}</a>
        </h1>
      ) : (
        <h1>{tickerData.name}</h1>
      )}{" "}
      <h2>{tickerData.ticker}</h2>
      {stockData.data ? (
        <h2>
          {" "}
          {stockData.data[0]
            ? "$" + stockData.data[0].price
            : "no price available"}
        </h2>
      ) : null}
      {/* stockData.data[0] ? "$" + stockData.data[0].price : "" */}
      <button onClick={() => addToList(tickerData)}>Add to WatchList</button>
      <div>
        {address ? (
          <ul>
            <li key={address.address1}>{address.address1}</li>
            <li key={address.city}>
              {address.city} {address.state}, {address.postal_code}
            </li>
          </ul>
        ) : (
          "no address available"
        )}
      </div>
      <p>{tickerData.description}</p>
    </>
  );
};

export default Ticker;
