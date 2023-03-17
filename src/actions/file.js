import axios from "axios";
import { hideLoader, showLoader } from "../reducers/appReducer";
import {
  addFile,
  deleteFileAction,
  setChosenFiles,
  setDirDateToUpdate,
  setFiles,
} from "../reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showUploader,
} from "../reducers/uploadReducer";
import shortid from "shortid";
import { API_URL } from "../config";
import { setUser } from "../reducers/userReducer";
export function getFiles(dirId, sort, chosenDir) {
  return async (dispatch) => {
    try {
      dispatch(showLoader());
      let response;
      let url = `${API_URL}api/files`;
      if (dirId) {
        url = `${API_URL}api/files?parent=${dirId}`;
      }
      if (sort) {
        url = `${API_URL}api/files?sort=${sort}`;
      }
      if (dirId && sort) {
        url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`;
      }

      if (chosenDir && sort) {
        url = `${API_URL}api/files?sort=${sort}&chosen=${chosenDir}`;
      }
      if (chosenDir && sort && dirId) {
        url = `${API_URL}api/files?parent=${dirId}&sort=${sort}&chosen=${chosenDir}`;
      }
      response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
export function chosenFiles(fileId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files/update`,
        {
          id: fileId.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setChosenFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
export function setLastOpenDate(fileId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files/changeDate`,
        {
          id: fileId.id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(setDirDateToUpdate(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(addFile(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function uploadFile(file, dirId) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dirId) {
        formData.append("parent", dirId);
      }
      const uploadFile = { name: file.name, progress: 0, id: shortid() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      const response = await axios.post(
        `${API_URL}api/files/upload`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          onUploadProgress: (progressEvent) => {
            uploadFile.progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            dispatch(changeUploadFile(uploadFile));
          },
        }
      );
      console.log("user i uploa", response.data);
      dispatch(addFile(response.data.dbFile));
      dispatch(setUser(response.data.user));
    } catch (e) {
      alert(e?.response?.data?.message);
    }
  };
}

export async function downloadFile(file) {
  console.log("DOWNLOAD" + file.name);
  const response = await fetch(`${API_URL}api/files/download?id=${file.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export function deleteFile(file) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_URL}api/files?id=${file.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(deleteFileAction(file.id));
      dispatch(setUser(response.data.user));
      // alert(response.data.message);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
export function searchFiles(search) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API_URL}api/files/search?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(setFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
