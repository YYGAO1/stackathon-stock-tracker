import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  addToWatchList,
  fetchStockQuotes,
  fetchTicker,
  fetchTickerNews,
} from "../store";
import StockChart from "./StockChart";
import dayjs from "dayjs";
import { Box, Button, Divider, ListItem, ListItemText } from "@mui/material";

const Ticker = () => {
  const { auth, ticker, stockData, news, aggregates } = useSelector(
    (state) => state
  );
  const { stocksTicker } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTicker(stocksTicker));
    dispatch(fetchStockQuotes(stocksTicker));
    dispatch(fetchTickerNews(stocksTicker));
    // dispatch(fetchAggregates());
  }, []);

  const tickerData = ticker.results ? ticker.results : "";
  const address = tickerData.address ? tickerData.address : "";
  // const _stockData = stockData ? stockData : null;
  const stockNews = news.results ? news.results : "";

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
          {stockData.data[0].price
            ? stockData.data[0].price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : ""}
        </h2>
      ) : null}
      {/* stockData.data[0] ? "$" + stockData.data[0].price : "" */}
      <Button
        variant="outlined"
        disabled={auth.id ? null : "disabled"}
        onClick={() => addToList(tickerData)}
      >
        Add to WatchList
      </Button>
      <div>
        {address ? (
          <ListItem sx={{ display: "flex", flexDirection: "column" }}>
            <ListItemText key={address.address1}>
              {address.address1}
            </ListItemText>
            <ListItemText key={address.city}>
              {address.city} {address.state}, {address.postal_code}
            </ListItemText>
          </ListItem>
        ) : (
          "no address available"
        )}
      </div>
      {aggregates ? <StockChart stocksTicker={tickerData.ticker} /> : null}
      <p>{tickerData.description}</p>
      <br />
      {stockNews === [] ? "" : <h3>Recent News</h3>}
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {stockNews
            ? stockNews.map((article) => {
                return (
                  <ListItemText
                    key={article.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <a href={article.article_url} className="tickerLink">
                      {article.title}
                    </a>
                    <Divider />

                    <ListItem sx={{ display: "flex", flexDirection: "column" }}>
                      <ListItemText key={article.author}>
                        {" "}
                        ({article.author})
                      </ListItemText>

                      <ListItemText key={article.published_utc}>
                        {/* {new Date(
                        Date.parse(article.published_utc)
                      ).toLocaleString()} */}
                        {dayjs(article.published_utc).format(
                          "MM-DD-YYYY hh:mm a"
                        )}
                      </ListItemText>
                      <ListItemText key={article.description}>
                        {article.description ? article.description : ""}
                      </ListItemText>
                    </ListItem>
                  </ListItemText>
                );
              })
            : null}
        </Box>
      </div>
    </>
  );
};

export default Ticker;
