import React, { useEffect } from "react";
import "./deleteFolderPopup.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteFolderPopup } from "../../reducers/fileReducer";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { deleteFile } from "../../actions/file";
import { setFileActionsInfo, setChosenFiles } from "../../reducers/fileReducer";
const DeleteFolderPopup = () => {
  const dispatch = useDispatch();
  const [deleteFolder, setDeleteFolder] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentDirToDelete, setCurrentDirToDelete] = useState("");
  const dirToDelete = useSelector((state) => state.files.currentDirToDelete);
  useEffect(() => {
    setCurrentDirToDelete(dirToDelete);
  }, [dirToDelete]);

  function changeDeletedName(e) {
    setDeleteFolder(e.target.value);
    if (e.target.value === popupDisplay[1]) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  function deleteFolderHandler() {
    dispatch(setChosenFiles(currentDirToDelete));
    dispatch(setFileActionsInfo(1, " папка удалена", "flex"));
    dispatch(deleteFile(popupDisplay[2]));
    dispatch(setDeleteFolderPopup("none", "", null));

    setDeleteFolder("");
  }

  const popupDisplay = useSelector(
    (state) => state.files.deleteFolderPopupDisplay
  );

  return (
    <div
      className="deletePopup"
      onClick={() => dispatch(setDeleteFolderPopup("none"))}
      style={{ display: popupDisplay[0] }}
    >
      <div
        className="deletePopup__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="deletePopup__header">
          <div>Введите {popupDisplay[1]} чтобы удалить</div>
          <div className="deletePopup__title">
            <AiFillCloseCircle
              className="deletePopup__close"
              onClick={() => dispatch(setDeleteFolderPopup("none"))}
            />
          </div>
        </div>
        <input
          className="deletePopup__input"
          onChange={changeDeletedName}
          value={deleteFolder}
          type="text"
          placeholder="Введите название папки"
        />
        <IoIosCheckmarkCircle
          className={
            isActive
              ? "deletePopup__delete__active"
              : "deletePopup__delete__disabled"
          }
          onClick={deleteFolderHandler}
        />
      </div>
    </div>
  );
};

export default DeleteFolderPopup;
