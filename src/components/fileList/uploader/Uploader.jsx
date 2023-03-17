import React from "react";
import UploadFile from "./UploadFile";
import "./uploader.css";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import { AiFillCloseCircle } from "react-icons/ai";
const Uploader = () => {
  const files = useSelector((state) => state.upload.files);
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();

  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <AiFillCloseCircle
            className="uploader__close"
            onClick={() => dispatch(hideUploader())}
          />
        </div>
        {files
          .map((file) => <UploadFile key={file.id} file={file} />)
          .reverse()}
      </div>
    )
  );
};

export default Uploader;
