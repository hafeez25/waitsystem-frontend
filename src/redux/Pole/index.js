import { combineReducers } from 'redux';

import PoleReducer from './PoleReducer';

export default combineReducers({
  pole: PoleReducer,
});
