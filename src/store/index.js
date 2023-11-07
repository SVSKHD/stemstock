import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { simpleDrawer } from "./reducers/simpleDrawerReducer";

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  simpleDrawer: simpleDrawer,
});

export default rootReducer;
