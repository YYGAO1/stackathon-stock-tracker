import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  Bar,
} from "recharts";
import { fetchAggregates } from "../store";
import dayjs from "dayjs";

const StockChart = ({ stocksTicker }) => {
  const { aggregates, ticker } = useSelector((state) => state);

  const dispatch = useDispatch();

  const today = dayjs();
  const from = today.subtract(1, "month");
  const _today = today.format("YYYY-MM-DD");
  const _from = from.format("YYYY-MM-DD");

  //   console.log("from", from);

  useEffect(() => {
    dispatch(
      fetchAggregates({
        stocksTicker: stocksTicker,
        multiplier: 1,
        timespan: "day",
        from: _from,
        to: _today,
      })
    );
  }, [ticker]);

  const data = aggregates
    ? aggregates.map((day) => {
        return {
          day: `${dayjs(day.t).format("YYYY-MM-DD")}`,
          average: day.vw,
          open: day.o,
          close: day.c,
          openVsClose: [day.o, day.c],
          color: day.o < day.c ? "#008000" : "#d30000",
        };
      })
    : null;

  return (
    <ComposedChart
      width={750}
      height={250}
      data={data}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
    >
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <XAxis dataKey="day" />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip />
      <Line type="monotone" dataKey="average" stroke="#8c623e" />

      <Bar
        type="monotone"
        dataKey="openVsClose"
        name="open vs closing price"
        fill="#008000"
        opacity={0.5}
      />
      {/* {<Bar dataKey={"open"} stackId={"a"} fill="#d30000" opacity={0.5} />}
      {<Bar dataKey={"close"} stackId={"a"} fill="#008000" opacity={0.5} />} */}
    </ComposedChart>
  );
};

export default StockChart;
