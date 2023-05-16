import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAcc } from "../store";
import { useNavigate } from "react-router-dom";

const CreateAcc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    isAdmin: false,
  });

  const onChange = (ev) => {
    setCredentials({
      ...credentials,
      [ev.target.name]: ev.target.value,
    });
  };
  const create = (ev) => {
    ev.preventDefault();
    dispatch(createAcc(credentials));
    setCredentials({ username: "", password: "", isAdmin: false });
    navigate("/admin/create");
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={create}>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={credentials.isAdmin}
              onChange={(ev) =>
                setCredentials((credentials) => ({
                  ...credentials,
                  isAdmin: true,
                }))
              }
              name="isAdmin"
            />
          }
          label="Admin?"
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        ></FormControlLabel>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateAcc;
