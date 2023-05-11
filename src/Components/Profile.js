import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { auth } = useSelector((state) => state);
  const authId = useParams();

  return (
    <>
      <h2>
        {auth.username}
        {auth.avatar}
      </h2>
      <p>{auth.about}</p>
    </>
  );
};

export default Profile;
