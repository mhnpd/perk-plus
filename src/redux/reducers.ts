import { combineReducers } from "@reduxjs/toolkit"
import { orgSlice } from "./slices/orgs"

export const rootReducer = combineReducers({
  [orgSlice.name]: orgSlice.reducer,
  // Add your reducers here
})