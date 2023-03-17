import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import "./fileList.css";
import File from "./file/File";
import { useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const FileList = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.files.files);
  const fileView = useSelector((state) => state.files.view);
  const currentTextSearch = useSelector((state) => state.files.searchText);

  console.log(currentTextSearch);
  if (fileView === "list") {
    return (
      <div className="fileList">
        <div className="fileList__header">
          <div className="fileList__name">Название</div>
          <div className="fileList__date">Дата</div>
          <div className="fileList__size">Размер</div>
        </div>

        {files.length === 0 && currentTextSearch ? (
          <h1 className="fileList_search">
            По запросу "{currentTextSearch}" файлы не найдены
          </h1>
        ) : (
          <TransitionGroup>
            {files.map((file) => (
              <CSSTransition
                key={file.id}
                timeout={500}
                classNames={"file"}
                exit={false}
              >
                <File file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </div>
    );
  }
  if (fileView === "plate") {
    return (
      <div className="fileplate">
        {files.length === 0 && currentTextSearch ? (
          <h1 className="fileList_searchPlate">
            По запросу "{currentTextSearch}" файлы не найдены
          </h1>
        ) : (
          files.map((file) => <File key={file.id} file={file} />)
        )}
      </div>
    );
  }
  return (
    <div className="fileList">
      <div className="fileList__header">
        <div className="fileList__name">Название</div>

        <div className="fileList__date">Дата</div>
        <div className="fileList__size">Размер</div>
      </div>
      {files.length === 0 ? (
        <h1>Файлы не найдены</h1>
      ) : (
        <TransitionGroup>
          {files.map((file) => (
            <CSSTransition
              key={file.id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}
    </div>
  );
};

export default FileList;
