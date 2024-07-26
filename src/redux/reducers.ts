import { combineReducers } from "@reduxjs/toolkit"
import { orgSlice } from "./slices/orgs"
import { cardsSlice } from "./slices/cards"
import { userSlice } from "./slices/user"

export const rootReducer = combineReducers({
  [orgSlice.name]: orgSlice.reducer,
  [cardsSlice.name]: cardsSlice.reducer,
  [userSlice.name]: userSlice.reducer
  // Add your reducers here
})