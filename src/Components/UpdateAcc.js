import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "../store";
import { useNavigate } from "react-router-dom";

const UpdateAcc = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [account, setAccount] = useState({
    username: "",
    password: "",
    avatar: "",
    about: "",
  });

  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => [
        setAccount((currentVal) => ({
          ...currentVal,
          avatar: reader.result || null,
        })),
      ]);
    });
  }, [ref]);

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        password: auth.password,
        about: auth.about ? auth.about : "",
        avatar: auth.avatar ? auth.avatar : "",
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
      <label>Username</label>
      <input
        placeholder="username"
        value={account.username}
        name="username"
        onChange={onChange}
      />
      <label>Password</label>
      <input
        placeholder="password"
        value={account.password}
        name="password"
        onChange={onChange}
        type="password"
      />
      <label>About</label>
      <textarea
        type="text"
        value={account.about ? account.about : ""}
        name="about"
        onChange={onChange}
      />
      <label>Avatar (PNG, JPEG, JPG only)</label>
      <input type="file" ref={ref} />
      <button> update </button>
    </form>
  );
};

export default UpdateAcc;
