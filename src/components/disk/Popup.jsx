import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../actions/file";
import { setPopupDisplay } from "../../reducers/fileReducer";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import "./disk.css";
const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  function createHandler() {
    dispatch(createDir(currentDir, dirName));
    setDirName("");
    dispatch(setPopupDisplay("none"));
  }
  return (
    <div
      className="popup"
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}
    >
      <div className="popup__content" onClick={(e) => e.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>

          <AiFillCloseCircle
            onClick={() => dispatch(setPopupDisplay("none"))}
            className="popup__close"
          />
        </div>
        <input
          className="popup__input"
          value={dirName}
          onChange={(e) => setDirName(e.target.value)}
          type="text"
          placeholder="Введите название папки"
        />
        <IoIosCheckmarkCircle
          className="popup__create"
          onClick={() => createHandler()}
        />
      </div>
    </div>
  );
};

export default Popup;
