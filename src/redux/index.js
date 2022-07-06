import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import locationReducer from './locationReducer';
import PolesReducer from './PolesReducer';
import ProfileReducer from './ProfileReducer';
import UniversalSearchReducer from './UniversalSearchReducer';

export default combineReducers({
  auth: AuthReducer,
  location: locationReducer,
  pole: PolesReducer,
  profile: ProfileReducer,
  search: UniversalSearchReducer,
});
