import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import { AiFillCloseCircle } from "react-icons/ai";
import sizeFormat from "../../../utils/sizeFormat";
import "./uploader.css";
const UploadFile = ({ file }) => {
  console.log(file);
  const dispatch = useDispatch();
  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>

        <AiFillCloseCircle
          className="upload-file__remove"
          onClick={() => dispatch(removeUploadFile(file.id))}
        />
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: file.progress + "%" }}
        />
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
