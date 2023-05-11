import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Trending = () => {
  const { stockData } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {});

  return (
    <>
      <h1>Trending past 24 hrs</h1>
    </>
  );
};

export default Trending;
