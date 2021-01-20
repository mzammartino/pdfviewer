import { SET_LOADED, SET_LOADING, SET_PDF_URL } from './app.actions';

const initialState = {
  loading: true,
  pdfUrl: null,
  currentPage: 0,
  totalPages: 0,
  zoom: 1,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PDF_URL:
      return { ...state, pdfUrl: payload };
    case SET_LOADED:
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
