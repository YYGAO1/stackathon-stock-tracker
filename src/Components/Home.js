import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import Trending from "./TrendingStock";
import { Typography } from "@mui/material";
import Dashboard from "./Dashboard";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div className="home">
        <Typography
          variant="button"
          style={{ textAlign: "left", display: "flex" }}
          className="welcomeMessage"
          sx={{ fontFamily: "Barlow" }}
        >
          Welcome {auth.username}!!
        </Typography>{" "}
        <Dashboard />
      </div>
      {/* <Trending /> */}
    </div>
  );
};

export default Home;
