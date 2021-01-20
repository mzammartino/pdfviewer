export const SET_LOADING = 'APP/SET_LOADING';
export const SET_LOADED = 'APP/SET_LOADED';
export const SET_PDF_URL = 'APP/SET_PDF_URL';

export const setLoading = () => ({ type: SET_LOADING, payload: true });
export const setLoaded = () => ({ type: SET_LOADED, payload: false });
export const setPDF = (payload) => ({ type: SET_PDF_URL, payload });
