import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
// import companySlice from "./companySlice";

const rootReducer = combineReducers({
  user: userSlice,
  // company: companySlice,
});

export { rootReducer };
