import React, { useState } from "react";
import { attemptLogin, register } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account } = useParams();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate("/");
  };

  const signup = (ev) => {
    ev.preventDefault();
    dispatch(register(credentials));
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={account === "login" ? login : signup}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <input
          placeholder="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
