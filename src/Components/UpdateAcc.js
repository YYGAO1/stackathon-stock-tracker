import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateAcc = () => {
  const { auth } = useSelector((state) => state);

  const [account, setAccount] = useState({
    username: "",
    password: "",
    avatar: "",
    about: "",
  });

  console.log(auth);

  useEffect(() => {
    if (auth) {
      setAccount({
        username: auth.username,
        about: auth.about,
      });
    }
  }, [auth]);

  console.log({ ...account });

  const onChange = (ev) => {
    setAccount({ ...account, [ev.target.name]: ev.target.value });
  };

  const update = () => {};

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
        value={account.password ? account.password : ""}
        name="password"
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="about"
        value={account.about}
        name="about"
        onChange={onChange}
      />
      {/* <input placeholder="avatar" value={} name="" onChange={}/> */}
    </form>
  );
};

export default UpdateAcc;
