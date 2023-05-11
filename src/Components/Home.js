import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import Trending from "./TrendingStock";
import ProfileMenu from "./ProfileMenu";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <h1>Home</h1> */}
      <div>
        Welcome {auth.username}!! <ProfileMenu />
      </div>
      {/* <Trending /> */}
    </div>
  );
};

export default Home;
