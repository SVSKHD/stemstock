import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { simpleDrawer } from "./reducers/simpleDrawerReducer";
import { authStatusReducer } from "./reducers/authUserStatusReducer";
import { userReducer } from "./reducers/userDetailReducer";
import {zerodhaReducer} from "./reducers/zerodhaReducer"

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  signupStatus: authStatusReducer,
  simpleDrawer: simpleDrawer,
  userData: userReducer,
  zerodhaUser:zerodhaReducer
});

export default rootReducer;
