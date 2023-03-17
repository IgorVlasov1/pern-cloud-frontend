import React, { useEffect, useRef, useState } from "react";
import "./file.css";
import { AiFillFile, AiFillFolder } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  pushToStack,
  setChosenFiles,
  // setChosenFiles,
  setCurrentDir,
  setCurrentDirToDelete,
  setDeleteFolderPopup,
  setFileActionsInfo,
  setStackFilesToDelete,
} from "../../../reducers/fileReducer";
import {
  chosenFiles,
  deleteFile,
  downloadFile,
  setLastOpenDate,
} from "../../../actions/file";
import { sizeFormat } from "../../../utils/sizeFormat";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { AiFillDelete, AiFillStar } from "react-icons/ai";
const File = ({ file }) => {
  const [selectFile, setSelectFile] = useState(false);

  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.view);
  const fileStack = useSelector((state) => state.files.fileStack);
  const [chosenFile, setChosenFile] = useState("");
  const [stackOfFiles, setStackOfFiles] = useState(fileStack);
  useEffect(() => {
    setStackOfFiles(fileStack);
  }, [fileStack]);
  function toggleClass(e) {
    if (e.ctrlKey || e.metaKey) {
      setSelectFile(!selectFile);
      if (stackOfFiles.includes(file)) {
        let idx = stackOfFiles.indexOf(file);
        console.log("index: ", idx);
        stackOfFiles.splice(idx, idx !== -1 ? 1 : 0);
      } else {
        stackOfFiles.push(file);
        dispatch(setStackFilesToDelete(stackOfFiles));
      }
    }
    console.log("Выбранные файлы: ", stackOfFiles);
  }

  function openDirHandler(file) {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file.id));
      dispatch(setLastOpenDate(file));
    }
  }

  function chosenFilesHandler() {
    setChosenFile(file);
    dispatch(chosenFiles(file));
    if (file.chosen == false) {
      dispatch(setChosenFiles(file));
      dispatch(setFileActionsInfo(0, "Файл добавлен в избранные", "flex"));
    }
    if (file.chosen == true) {
      dispatch(setChosenFiles(file));
      dispatch(setFileActionsInfo(0, "Файл удален из избранных", "flex"));
    }
  }

  function downloadClickHandler(e) {
    e.stopPropagation();
    if (stackOfFiles.length > 0) {
      stackOfFiles.map((file) => downloadFile(file));
    } else {
      downloadFile(file);
    }
  }

  function deleteClickHandler(e) {
    if (stackOfFiles.length > 0) {
      stackOfFiles.map((file) => {
        dispatch(deleteFile(file));
      });
      dispatch(setChosenFiles(file));
      dispatch(
        setFileActionsInfo(stackOfFiles.length, " файла удалено", "flex")
      );
      stackOfFiles.splice(0, stackOfFiles.length);
      return;
    }
    if (file.type === "dir") {
      e.stopPropagation();
      dispatch(setCurrentDirToDelete(file));
      dispatch(setDeleteFolderPopup("flex", file.name, file));
      return;
    }

    dispatch(setChosenFiles(file));
    dispatch(deleteFile(file));
    dispatch(setFileActionsInfo(1, " Файл удален", "flex"));
  }

  if (fileView === "list") {
    return (
      <div
        className={selectFile ? "file__active" : "file"}
        onClick={(e) => {
          if (e.target.closest("svg") == undefined) {
            openDirHandler(file);
          }
        }}
      >
        {file.type === "dir" ? (
          <AiFillFolder className="file__folder" />
        ) : (
          <AiFillFile onClick={toggleClass} className="file__other" />
        )}
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <BsFillCloudDownloadFill
            className="file__btn file__download"
            onClick={(e) => downloadClickHandler(e)}
          />
        )}
        <AiFillDelete
          className="file__btn file__delete"
          onClick={(e) => deleteClickHandler(e)}
        />
        <AiFillStar
          onClick={(e) => chosenFilesHandler(e)}
          className={
            selectFile ? "file__select__disabled" : "file__btn file__select"
          }
        />
      </div>
    );
  }

  if (fileView === "plate") {
    return (
      <div
        className="file-plate"
        onClick={(e) => {
          console.log(e.target.closest("svg").className);
          if (
            e.target.closest("svg").className.baseVal !==
              "file-plate__btn file-plate__select" &&
            e.target.closest("svg").className.animVal !==
              "file-plate__btn file-plate__selectActive"
          ) {
            openDirHandler(file);
          }
        }}
      >
        {file.type === "dir" ? (
          <AiFillFolder className="file-plate__folder" />
        ) : (
          <AiFillFile
            onClick={toggleClass}
            className={
              selectFile ? "file-plate__other__active" : "file-plate__other"
            }
          />
        )}
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== "dir" && (
            <BsFillCloudDownloadFill
              className="file-plate__btn file-plate__download"
              onClick={(e) => downloadClickHandler(e)}
            />
          )}
          <AiFillDelete
            className="file-plate__btn file-plate__delete"
            onClick={(e) => deleteClickHandler(e)}
          />
          <AiFillStar
            onClick={(e) => chosenFilesHandler(e)}
            className={
              selectFile
                ? "file-plate__select__disabled"
                : "file-plate__btn file-plate__select"
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={selectFile ? "file__active" : "file"}
      onClick={(e) => {
        if (e.target.closest("svg") == undefined) {
          openDirHandler(file);
        }
      }}
    >
      {file.type === "dir" ? (
        <AiFillFolder className="file__folder" />
      ) : (
        <AiFillFile onClick={toggleClass} className="file__other" />
      )}
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== "dir" && (
        <BsFillCloudDownloadFill
          className="file__btn file__download"
          onClick={(e) => downloadClickHandler(e)}
        />
      )}

      <AiFillDelete
        className="file__btn file__delete"
        onClick={(e) => deleteClickHandler(e)}
      />
      <AiFillStar
        onClick={(e) => chosenFilesHandler(e)}
        className={
          selectFile ? "file__select__disabled" : "file__btn file__select"
        }
      />
    </div>
  );
};

export default File;
