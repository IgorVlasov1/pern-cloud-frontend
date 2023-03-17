import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir, getFiles, uploadFile } from "../../actions/file";
import {
  popFromStack,
  pushToStack,
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from "../../reducers/fileReducer";

import FileList from "../fileList/FileList";
import Uploader from "../fileList/uploader/Uploader";
import Select from "react-select";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { AiFillClockCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { ImFloppyDisk } from "react-icons/im";
import { BiTimeFive } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { BsFillCloudUploadFill } from "react-icons/bs";
import "./disk.css";
import Popup from "./Popup";
import DeleteFolderPopup from "./DeleteFolderPopup";
import FileActionsInfo from "./FileActionsInfo";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const loader = useSelector((state) => state.app.loader);
  const dirStack = useSelector((state) => state.files.dirStack);
  // const chosenDirStack = useSelector((state) => state.files.chosenFileStack);

  const chosenFile = useSelector((state) => state.files.chosenFileStack);
  const files = useSelector((state) => state.files.files);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");
  const [chosen, setChosen] = useState("");

  useEffect(() => {
    // setFileStack(files);
    dispatch(getFiles(currentDir, sort, chosen));
  }, [currentDir, sort, chosen, chosenFile]);

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function getLastOpenFiles() {
    setChosen("lastOpen");
  }

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function loadBase() {
    setChosen("");
  }

  function getSelectedFiles() {
    setChosen("chosen");
  }
  function fileUploadHandler(e) {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  }
  function dragEnterHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  }
  function dropHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
    >
      <div className="disk__leftPanel">
        <div
          onClick={loadBase}
          className={chosen == "" ? "myDiskActive" : "myDisk"}
        >
          <ImFloppyDisk />
          <a>Мой диск</a>
        </div>
        <div
          onClick={getLastOpenFiles}
          className={chosen == "lastOpen" ? "myDiskActive" : "lastTime"}
        >
          <BiTimeFive />
          <a>Недавние</a>
        </div>
        <div
          onClick={getSelectedFiles}
          className={chosen == "chosen" ? "myDiskActive" : "chosenFiles"}
        >
          <FaRegStar />
          <a>Избранные</a>
        </div>
      </div>
      <div className="disk__btns">
        {dirStack.length > 0 && (
          // .length > 0
          <div className="disk__back">
            <IoReturnUpBackSharp onClick={() => backClickHandler()} />
          </div>
        )}
        {!chosen && (
          <MdOutlineCreateNewFolder
            className="disk__create"
            onClick={() => showPopupHandler()}
          />
        )}

        {!chosen && (
          <div className="disk__upload">
            <label htmlFor="disk__upload-input" className="disk__uploadLabel">
              <BsFillCloudUploadFill className="uploadButton" />
              <a className="uploadText">Загрузить файл</a>
            </label>
            <input
              multiple={true}
              onChange={(e) => fileUploadHandler(e)}
              type="file"
              id="disk__upload-input"
              className="disk__uploadInput"
            />
          </div>
        )}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="disk__select"
        >
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
          <option value="size">По размеру</option>
        </select>
        <AiOutlineUnorderedList
          className="disk__list"
          onClick={() => dispatch(setFileView("list"))}
        />
        <BsFillGrid3X3GapFill
          className="disk__plate"
          onClick={() => dispatch(setFileView("plate"))}
        />
      </div>

      <FileList />
      <DeleteFolderPopup />
      <Popup />
      <Uploader />
      <FileActionsInfo />
    </div>
  ) : (
    <div
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}
      className="drop-area"
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
