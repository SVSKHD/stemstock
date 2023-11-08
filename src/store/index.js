import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { simpleDrawer } from "./reducers/simpleDrawerReducer";
import { authStatusReducer } from "./reducers/authUserStatusReducer";

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  signupStatus: authStatusReducer,
  simpleDrawer: simpleDrawer,
});

export default rootReducer;
