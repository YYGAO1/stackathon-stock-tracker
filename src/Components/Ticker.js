import React from "react";
import { useSelector } from "react-redux";

const Ticker = () => {
  const { ticker } = useSelector((state) => state);

  return <>{JSON.stringify(ticker.results)}</>;
};

export default Ticker;
