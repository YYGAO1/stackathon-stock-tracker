import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addToWatchList,
  fetchAggregates,
  fetchNextPage,
  fetchStockQuotes,
  fetchTicker,
  fetchTickers,
} from "../store";
import { fetchTickerNews } from "../store/news";
import { Button, ListItem, ListItemText } from "@mui/material";

const Tickers = () => {
  const { auth, tickers } = useSelector((state) => state);
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
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {tickers
          ? tickers.results.map((stock) => {
              return (
                <ListItemText key={stock.ticker}>
                  <Link
                    className="tickerLink"
                    to={`/tickers/${stock.ticker}`}
                    onClick={() => getTicker(stock.ticker)}
                  >
                    {stock.name}{" "}
                  </Link>{" "}
                  ({stock.ticker}){" "}
                  <Button
                    disabled={auth.id ? null : "disabled"}
                    onClick={() => addToList(stock)}
                  >
                    Add to WatchList
                  </Button>
                </ListItemText>
              );
            })
          : null}
        {/* <Link to={`/tickers/pg/${num * 1 + 1}`}>Next Page</Link> */}
        <Button onClick={() => nextPage(tickers.next_url)}>Next Page</Button>
      </ListItem>
    </>
  );
};
export default Tickers;
