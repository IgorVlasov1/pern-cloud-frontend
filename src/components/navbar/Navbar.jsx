import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import { setSearchStringValue } from "../../reducers/fileReducer";
import avatarLogo from "../../assets/default.svg";
import { API_URL } from "../../config";
const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPage = useSelector((state) => state.app.currentPage);
  console.log(currentPage);
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const avatar = currentUser.avatar
    ? `${API_URL + currentUser.avatar}`
    : avatarLogo;
  function searchChangeHandler(e) {
    setSearchName(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          () => {
            dispatch(setSearchStringValue(e.target.value));
            dispatch(searchFiles(e.target.value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(setSearchStringValue(""));
      dispatch(getFiles(currentDir));
    }
  }
  return (
    <div className="navbar">
      {isAuth && currentPage !== "profile" && (
        <input
          value={searchName}
          onChange={(e) => searchChangeHandler(e)}
          type="text"
          className="navbar__search"
          placeholder="Название файла..."
        ></input>
      )}
      {!isAuth && (
        <div className="navbar__login">
          <NavLink to="/login">Войти</NavLink>
        </div>
      )}
      {!isAuth && (
        <div className="navbar__registration">
          <NavLink to="/registration">Регистрация</NavLink>
        </div>
      )}
      {isAuth && (
        <NavLink to="/profile">
          <img className="navbar__avatar" src={avatar} alt="" />
        </NavLink>
      )}
      {currentPage === "profile" && (
        <div className="navbar__disk">
          <NavLink to="/">Диск</NavLink>
        </div>
      )}
      {isAuth && (
        <div
          className="navbar__registrationExit"
          onClick={() => dispatch(logout())}
        >
          Выход
        </div>
      )}
    </div>
  );
};

export default Navbar;
