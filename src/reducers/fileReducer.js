const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_FILE = "ADD_FILE";
const SET_POPUP_DISPLAY = "SET_POPUP_DISPLAY";
const SET_DELETE_POPUP_DISPLAY = "SET_DELETE_POPUP_DISPLAY";
const SET_CURRENT_DIR_TO_DELETE = "SET_CURRENT_DIR_TO_DELETE";
const PUSH_TO_STACK = "PUSH_TO_STACK";
const DELETE_FILE = "DELETE_FILE";
const SET_VIEW = "SET_VIEW";
const SEARCH_STRING_VALUE = "SEARCH_STRING_VALUE";
const SET_STACK_FILES_TO_DELETE = "SET_STACK_FILES_TO_DELETE";
const CHOSEN_STACK_FILE = "CHOSEN_STACK_FILE";
const SET_DATEDIR_TO_UPDATE = "SET_DATEDIR_TO_UPDATE";
const SET_PARAMS_TO_FILE_ACTIONS_INFO = "SET_PARAMS_TO_FILE_ACTIONS_INFO";

const defaultState = {
  files: [],
  currentDir: null,
  popupDisplay: "none",
  deleteFolderPopupDisplay: "none",
  currentDirToDelete: null,
  fileActionsInfo: "none",
  popupSubmited: null,
  searchText: "",
  dirStack: [],
  fileStack: [],
  view: "list",
  chosenFileStack: "",
  openedDateDir: null,
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload };
    case SET_PARAMS_TO_FILE_ACTIONS_INFO:
      return {
        ...state,
        fileActionsInfo: [
          action.countFiles,
          action.nameOfButton,
          action.displayInfo,
          action.file,
        ],
      };

    case SET_CURRENT_DIR_TO_DELETE:
      return { ...state, currentDirToDelete: action.payload };
    case SET_DELETE_POPUP_DISPLAY:
      return {
        ...state,
        deleteFolderPopupDisplay: [
          action.payload,
          action.text,
          action.submited,
        ],
      };
    case SET_DATEDIR_TO_UPDATE:
      return { ...state, openedDateDir: action.payload };
    case SET_CURRENT_DIR_TO_DELETE:
      return { ...state, currentDirToDelete: action.payload };
    case SEARCH_STRING_VALUE:
      return { ...state, searchText: action.payload };
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload };
    case SET_STACK_FILES_TO_DELETE:
      return {
        ...state,
        fileStack: action.payload,
        // [...state.fileStack, action.payload]
      };
    case CHOSEN_STACK_FILE:
      return {
        ...state,
        chosenFileStack: action.payload,
      };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file.id != action.payload)],
      };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
});
export const pushToStack = (dir) => ({
  type: PUSH_TO_STACK,
  payload: dir,
});
export const deleteFileAction = (dirId) => ({
  type: DELETE_FILE,
  payload: dirId,
});
export const setFileView = (payload) => ({ type: SET_VIEW, payload });
export const setDeleteFolderPopup = (display, deleteDir, popupSubmited) => ({
  type: SET_DELETE_POPUP_DISPLAY,
  payload: display,
  text: deleteDir,
  submited: popupSubmited,
});
export const setChosenFiles = (file) => ({
  type: CHOSEN_STACK_FILE,
  payload: file,
});
export const setSearchStringValue = (text) => ({
  type: SEARCH_STRING_VALUE,
  payload: text,
});
export const setStackFilesToDelete = (file) => ({
  type: SET_STACK_FILES_TO_DELETE,
  payload: file,
});
export const popFromStack = (dir) => ({
  type: PUSH_TO_STACK,
  payload: dir,
});
export const setDirDateToUpdate = (dir) => ({
  type: SET_DATEDIR_TO_UPDATE,
  payload: dir,
});
export const setFileActionsInfo = (count, nameOfAction, display, file) => ({
  type: SET_PARAMS_TO_FILE_ACTIONS_INFO,
  countFiles: count,
  nameOfButton: nameOfAction,
  displayInfo: display,
  file,
});
export const setCurrentDirToDelete = (dir) => ({
  type: SET_CURRENT_DIR_TO_DELETE,
  payload: dir,
});
