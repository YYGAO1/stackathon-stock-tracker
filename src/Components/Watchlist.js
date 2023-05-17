import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, removeFromWatchList, updateStockNote } from "../store";
import { Link, useNavigate } from "react-router-dom";
import StockNote from "./StockNote";
import {
  Button,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";

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
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {stocks
          ? stocks.map((stock) => {
              return (
                <ListItemText
                  key={stock.ticker}
                  sx={{ alignContent: "center" }}
                >
                  <Link className="tickerLink" to={`/tickers/${stock.ticker}`}>
                    {stock.name}
                  </Link>{" "}
                  ({stock.ticker}){" "}
                  <Button onClick={() => remove(stock)}>x</Button>
                  <ListItemText>
                    {stock.note ? (
                      <ListItemText
                        key={stock.note}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                      >
                        {stock.note}{" "}
                        <Button onClick={() => update(stock)}>edit note</Button>
                      </ListItemText>
                    ) : (
                      <Button onClick={() => update(stock)}>add note</Button>
                    )}
                  </ListItemText>
                </ListItemText>
              );
            })
          : null}
      </ListItem>
    </>
  );
};

export default Watchlist;
