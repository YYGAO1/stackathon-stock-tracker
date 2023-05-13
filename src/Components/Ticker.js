import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToWatchList, fetchStockQuotes, fetchTicker } from "../store";
import StockChart from "./StockChart";
import dayjs from "dayjs";

const Ticker = () => {
  const { ticker, stockData, news, aggregates } = useSelector((state) => state);
  const { stocksTicker } = useParams();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTicker(stocksTicker));
  //   dispatch(fetchStockQuotes(stocksTicker));
  //   dispatch(fetchTickerNews(stocksTicker));
  // }, []);

  const tickerData = ticker.results ? ticker.results : "";
  const address = tickerData.address ? tickerData.address : "";
  const _stockData = stockData ? stockData : null;
  const stockNews = news.results;

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
          <a href={`${tickerData.homepage_url}`} className="tickerLink">
            {tickerData.name}
          </a>
        </h1>
      ) : (
        <h1>{tickerData.name}</h1>
      )}{" "}
      <h2>{tickerData.ticker}</h2>
      {stockData.data ? (
        <h2>
          {" "}
          {stockData.data[0]
            ? stockData.data[0].price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
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
      {aggregates ? <StockChart stocksTicker={tickerData.ticker} /> : null}
      <p>{tickerData.description}</p>
      <h3>Recent News</h3>
      <div>
        <ul>
          {stockNews ? (
            stockNews.map((article) => {
              return (
                <li key={article.id}>
                  <a href={article.article_url} className="tickerLink">
                    {article.title}
                  </a>
                  <ul>
                    <li key={article.author}> ({article.author})</li>
                    <li key={article.published_utc}>
                      {/* {new Date(
                        Date.parse(article.published_utc)
                      ).toLocaleString()} */}
                      {dayjs(article.published_utc).format(
                        "MM-DD-YYYY hh:mm a"
                      )}
                    </li>
                    <li key={article.description}>
                      {article.description ? article.description : ""}
                    </li>
                  </ul>
                </li>
              );
            })
          ) : (
            <p>"no news yet!"</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Ticker;
