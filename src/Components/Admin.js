import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createAcc = () => {
    handleClose();
    navigate("/admin/create");
  };

  const editUserAcc = () => {
    handleClose();
    navigate("/admin/edit");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "white", fontFamily: "Barlow" }}
      >
        Admin
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={createAcc} sx={{ fontFamily: "Barlow" }}>
          Create Account
        </MenuItem>
        {/* <MenuItem onClick={editUserAcc} sx={{ fontFamily: "Barlow" }}>
          Edit Accounts
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}></MenuItem> */}
      </Menu>
    </div>
  );
};

export default Admin;
