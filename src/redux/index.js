import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import locationReducer from './locationReducer';
import PolesReducer from './PolesReducer';

export default combineReducers({
  auth: AuthReducer,
  location: locationReducer,
  pole: PolesReducer,
});
