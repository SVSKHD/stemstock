import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { simpleDrawer } from "./reducers/simpleDrawerReducer";
import { authStatusReducer } from "./reducers/authUserStatusReducer";
import { userReducer } from "./reducers/userDetailReducer";
import { zerodhaReducer } from "./reducers/zerodhaReducer";
import { forgetPasswordReducer } from "./reducers/forgetPasswordReducer";
import { brokerStatusReducer } from "./reducers/brokerReducer";

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  signupStatus: authStatusReducer,
  forgetPassword: forgetPasswordReducer,
  simpleDrawer: simpleDrawer,
  userData: userReducer,
  zerodhaUser: zerodhaReducer,
  broker: brokerStatusReducer,
});

export default rootReducer;
