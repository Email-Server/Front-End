import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useStore from "../../hooks/useStore";
import Avatar from "react-avatar";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
function Header({ handleEmailSearch, setSearchTerm, searchTerm }) {
  const navigate = useNavigate();
  const {
    setLogin,
    userInfo: { name },
  } = useStore();

  const signOut = () => {
    setLogin(false);
    navigate("/login");
  };
  console.log(name);
  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleEmailSearch(value, searchTerm);
  };
  return (
    <div className="header">
      <div className="header-left">
        {/* <IconButton>
          <MenuIcon />
        </IconButton> */}
        <img src={logo} alt="gmail logo" />
      </div>
      <div className="header-middle">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search mail"
          value={searchTerm}
          onChange={searchHandler}
        />
        {/* <ArrowDropDownIcon className="header-inputCaret" /> */}
      </div>
      <div className="header-right">
        {/* <IconButton>
          <HelpOutlineIcon />
        </IconButton> */}
        {/* <IconButton>
          <NotificationsIcon />
        </IconButton> */}
        {/* <IconButton>
          <AppsIcon />
        </IconButton> */}
        <div className="flex items-center gap-2 mr-4">
          <Avatar name={name} round={true} size="40" />
          <p className="font-semibold ">{name}</p>
        </div>

        <IconButton onClick={signOut}>
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
