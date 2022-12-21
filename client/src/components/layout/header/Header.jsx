import React, { useState, useContext, useCallback, useEffect } from "react";
import Menu from "../../images/svg/main/bars-solid.svg";
import Close from "../../images/svg/main/times-solid.svg";
import { Link } from "react-router-dom";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useHttp } from "../../../hooks/http.hook";
import { Menu as MenuMUI, MenuItem } from "@mui/material";
import { FormControl, InputLabel, Select } from "@mui/material";
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [account, setAccount] = useState(null);

  const fetchAccount = useCallback(async () => {
    try {
      await request("/api/account", "GET", null, null, {
        Authorization: `Bearer ${auth.token}`,
      }).then((res) => {
        setAccount(res.data);
      });
    } catch (e) {}
  }, [request, auth]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const languages = [
    { value: "en", text: "en" },
    { value: "ru", text: "ru" },
    { value: "uk", text: "uk" },
  ];

  const handleChange = (e) => {
    setLang(e.target.value);
    const url = window.location.href;
    window.location.replace(
      url.substring(0, url.lastIndexOf("?")) + "?lng=" + e.target.value
    );
  };

  const [lang, setLang] = useState(localStorage.getItem('i18nextLng').length > 0 ? localStorage.getItem('i18nextLng') : "en");


  return location.pathname !== "/login" &&
    location.pathname.indexOf("/success") < 0 &&
    location.pathname.indexOf("/canceled") < 0 ? (
    <header>
      <div
        className="menu"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        <img src={Menu} alt="" width="20" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">DIABET HELP</Link>
        </h1>
      </div>
      <nav>
        <ul className={toggle ? "toggle" : ""}>     
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li
            onClick={() => {
              if (window.location.pathname !== "/main") {
                window.location.pathname = "/main";
              } else {
                window.scrollTo({ top: 600, left: 0, behavior: "smooth" });
              }
            }}
          >
            <Link>{t("premium")}</Link>
          </li>
          <li
            onClick={() => {
              if (window.location.pathname !== "/main") {
                window.location.pathname = "/main";
              } else {
                window.scrollTo({ top: 1150, left: 0, behavior: "smooth" });
              }
            }}
          >
            <Link>{t("contact")}</Link>
          </li>
          <li
            onClick={() => {
              if (window.location.pathname !== "/main") {
                window.location.pathname = "/main";
              } else {
                window.scrollTo({ top: 1900, left: 0, behavior: "smooth" });
              }
            }}
          >
            <Link>FAQ</Link>
          </li>
          {!account ? (
            <li>
              <Link to="/login">{t("login/register")}</Link>
            </li>
          ) : (
            <li>
              <div>
                <Link
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  {account.name.toUpperCase()}
                </Link>
                <MenuMUI
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleClose}>{t("settings")}</MenuItem>
                  </Link>
                  <Link
                    to="/statistics"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleClose}>{t("statisticss")}</MenuItem>
                  </Link>
                  <Link
                    to="/main"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => {
                      auth.logout();
                      setAccount(null);
                    }}
                  >
                    <MenuItem onClick={handleClose}>{t("exit")}</MenuItem>
                  </Link>
                </MenuMUI>
              </div>
            </li>
          )}
          <li
            className="close"
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            <img src={Close} alt="" width="20" />
          </li>
          <li>
            <div>
              <select class="custom-select"
                style={{
                  border: "none",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  color: "#555",
                  padding: "0 15px",
                  fontSize: "15px",
                }}
                value={lang}
                onChange={handleChange}
              >
                {languages.map((item) => {
                  return (
                    <option  key={item.value} value={item.value}>
                      {item.text}
                    </option>
                  );
                })}
              </select>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  ) : (
    <></>
  );
};

export default Header;
