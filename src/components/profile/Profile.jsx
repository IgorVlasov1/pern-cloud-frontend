import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import "./profile.css";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import avatarLogo from "../../assets/default.svg";
import sizeFormat from "../../utils/sizeFormat";
import { checkCurrentPage } from "../../reducers/appReducer";
import Select from "react-select";
const Profile = () => {
  const dispatch = useDispatch();
  function changeHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }
  useEffect(() => {
    dispatch(checkCurrentPage("profile"));
    return () => {
      dispatch(checkCurrentPage(null));
    };
  }, []);

  const currentUser = useSelector((state) => state.user.currentUser);
  const [profileInfo, setProfileInfo] = useState(currentUser);
  useEffect(() => {
    setProfileInfo(currentUser);
  }, [currentUser]);

  const avatar = profileInfo.avatar
    ? `${API_URL + profileInfo.avatar}`
    : avatarLogo;
  let percentUsageDisk = Math.floor(
    (profileInfo.usedSpace / profileInfo.diskSpace) * 100
  );
  return (
    <div className="user__profile">
      <img className="user__profile__avatar" src={avatar} alt="" />
      <div className="user__profile__change__avatar">
        <button>
          <label for="user__profle__uploadAvatar">Сменить</label>
        </button>
        <button onClick={() => dispatch(deleteAvatar())}>Удалить</button>
        <input
          id="user__profle__uploadAvatar"
          className="user__profle__uploadAvatar"
          accept="image/*"
          onChange={(e) => changeHandler(e)}
          type="file"
          placeholder="Загрузить аватар"
        />
      </div>

      <p className="user__profile__name">{profileInfo.email}</p>
      <div className="user__profile__progress-bar">
        <span style={{ width: percentUsageDisk + "%" }}></span>
      </div>

      <p className="user__profile__usedSpace__text">
        Использованно {sizeFormat(profileInfo.usedSpace)} из{" "}
        {sizeFormat(profileInfo.diskSpace)}
      </p>
    </div>
  );
};

export default Profile;
