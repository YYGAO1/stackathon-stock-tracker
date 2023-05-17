import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockQuotes, fetchTrending } from "../store";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";

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
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data
            ? data.map((stock) => {
                return (
                  <ListItem
                    key={stock.key}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link to={`/tickers/${stock.key}`} className="tickerLink">
                      {stock.key}
                    </Link>
                  </ListItem>
                );
              })
            : null}
        </List>
      </div>
    </>
  );
};

export default Trending;
