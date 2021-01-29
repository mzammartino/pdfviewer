export const SET_LOADING = 'APP/SET_LOADING';
export const SET_LOADED = 'APP/SET_LOADED';
export const SET_PDF_URL = 'APP/SET_PDF_URL';
export const SET_TOTAL_SIZE = 'APP/SET_TOTAL_SIZE';
export const SET_LOADED_SIZE = 'APP/SET_LOADED_SIZE';
export const SET_DOCUMENT = 'APP/SET_DOCUMENT';
export const SET_REDACT = 'APP/SET_REDACT';

export const setLoading = () => ({ type: SET_LOADING, payload: true });
export const setLoaded = () => ({ type: SET_LOADED, payload: false });
export const setPDF = (payload) => ({ type: SET_PDF_URL, payload });
export const setTotalSize = (payload) => ({ type: SET_TOTAL_SIZE, payload });
export const setLoadedSize = (payload) => ({ type: SET_LOADED_SIZE, payload });
export const setDocument = (payload) => ({ type: SET_DOCUMENT, payload });
