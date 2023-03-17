import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setFileActionsInfo } from "../../reducers/fileReducer";
import "./disk.css";
const FileActionsInfo = () => {
  const dispatch = useDispatch();
  const infoToShow = useSelector((state) => state.files.fileActionsInfo);
  const [infoDA, setInfoDa] = useState(infoToShow);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setInfoDa(infoToShow);
  }, [infoToShow]);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 2);
    }, 100);

    let timeoutId = setTimeout(() => {
      dispatch(setFileActionsInfo(0, "", "none"));
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
      setProgress(0);
    };
  }, []);
  return (
    <div
      className={
        infoDA[2] == "flex"
          ? "fileaction__container"
          : "fileaction__container__disabled"
      }
    >
      <div className="fileActionsInfo">
        <p>
          {infoDA[0] ? infoDA[0] : ""}
          {infoDA[1]}
        </p>
        <AiFillCloseCircle
          className="fileaction__button__close"
          onClick={() => setInfoDa(0, "", "none")}
        />
      </div>
      <progress
        className="fileaction__progress__bar"
        id="progressbar"
        max="100"
        value={progress}
      />
    </div>
  );
};

export default FileActionsInfo;
