import {
  SET_DOCUMENT,
  SET_LOADED, SET_LOADED_SIZE, SET_LOADING, SET_PDF_URL, SET_TOTAL_SIZE,
} from './app.actions';

const initialState = {
  loading: true,
  pdfUrl: null,
  document: null,
  currentPage: 0,
  totalPages: 0,
  size: 0,
  loadedSize: -1,
  zoom: 2,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PDF_URL:
      return { ...state, pdfUrl: payload };
    case SET_LOADED:
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_TOTAL_SIZE:
      return { ...state, size: payload };
    case SET_LOADED_SIZE:
      return { ...state, loadedSize: payload };
    case SET_DOCUMENT:
      return { ...state, document: payload };
    default:
      return state;
  }
};
