import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AppsIcon from "@mui/icons-material/Apps";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import useStore from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
function Header({ handleEmailSearch, setSearchTerm, searchTerm }) {
  const navigate = useNavigate();
  const { setLogin } = useStore();

  const signOut = () => {
    setLogin(false);
    navigate("/login");
  };

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleEmailSearch(value, searchTerm);
  };
  return (
    <div className="header">
      <div className="header-left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzRceIIBz4GgeNszaN5SupI6p1SJE_Bzgk3Q&usqp=CAU"
          alt="gmail logo"
        />
      </div>
      <div className="header-middle">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search mail"
          value={searchTerm}
          onChange={searchHandler}
        />
        <ArrowDropDownIcon className="header-inputCaret" />
      </div>
      <div className="header-right">
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <Avatar src={"photoUrl"} />
        <IconButton onClick={signOut}>
          <LogoutIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
