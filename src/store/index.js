import { combineReducers, createStore } from 'redux';
import appReducer from './app/app.reducer';

export default createStore(combineReducers({
  app: appReducer,
}));
