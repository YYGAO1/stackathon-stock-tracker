import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { useNavigate } from "react-router-dom";

const UpdateAcc = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    username: "",
    password: "",
    avatar: "",
    about: "",
  });

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        password: auth.password,
        about: auth.about,
      });
    }
  }, [auth]);

  const onChange = (ev) => {
    setAccount({ ...account, [ev.target.name]: ev.target.value });
  };

  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(updateAuth(account));
    navigate(`/users/${auth.id}`);
  };

  return (
    <form onSubmit={update}>
      <input
        placeholder="username"
        value={account.username}
        name="username"
        onChange={onChange}
      />
      <input
        placeholder="password"
        value={account.password}
        name="password"
        onChange={onChange}
        type="password"
      />
      <input
        type="text"
        placeholder="about"
        value={account.about}
        name="about"
        onChange={onChange}
      />
      {/* <input placeholder="avatar" value={} name="" onChange={}/> */}
      <button> update </button>
    </form>
  );
};

export default UpdateAcc;
