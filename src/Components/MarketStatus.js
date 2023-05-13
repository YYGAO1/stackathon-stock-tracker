import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketStatus } from "../store";

const MarketStatus = () => {
  const { marketStatus } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketStatus());
  }, []);

  const markets = marketStatus.exchanges ? marketStatus.exchanges : "";
  const nasdaq = markets.nasdaq ? markets.nasdaq : null;
  const nyse = markets.nasdaq ? markets.nyse : null;

  return (
    <div>
      <div className="stockExchanges">
        <div
          style={{
            color: nasdaq === "closed" ? "red" : "green",
          }}
        >
          NASDAQ: {nasdaq}
        </div>{" "}
        <div
          style={{
            color: nyse === "closed" ? "red" : "green",
          }}
        >
          NYSE: {nyse}
        </div>
      </div>
    </div>
  );
};

export default MarketStatus;
