const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
const CURRENT_PAGE = "CURRENT_PAGE";

const defaultState = {
  loader: false,
  currentPage: null,
};

export default function appReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };
    case CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
}

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });
export const checkCurrentPage = (currentPage) => ({
  type: CURRENT_PAGE,
  payload: currentPage,
});
