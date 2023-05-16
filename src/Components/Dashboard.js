import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";
import { Avatar } from "@mui/material";

export default function Dashboard() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    dispatch(logout());
    navigate("/");
  };

  const editAcc = () => {
    handleClose();
    navigate("/update");
  };

  const profile = () => {
    handleClose();
    navigate(`/users/${auth.id}`);
  };

  return (
    <div className="profileMenu">
      <Avatar
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        alt="avatar"
        src={auth.avatar}
      ></Avatar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={profile} sx={{ fontFamily: "Barlow" }}>
          Profile
        </MenuItem>
        <MenuItem onClick={editAcc} sx={{ fontFamily: "Barlow" }}>
          Edit Account
        </MenuItem>
        <MenuItem onClick={logOut} sx={{ fontFamily: "Barlow" }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
