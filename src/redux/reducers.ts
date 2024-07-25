import { combineReducers } from "@reduxjs/toolkit"
import { userOrgsReducer, userOrgsSliceMountPoint } from "./slices/user-orgs"
export const rootReducer = combineReducers({
  [userOrgsSliceMountPoint]: userOrgsReducer,
  // Add your reducers here
})