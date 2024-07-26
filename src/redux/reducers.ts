import { combineReducers } from "@reduxjs/toolkit"
import { orgSlice } from "./slices/orgs"
import { cardsSlice } from "./slices/cards"

export const rootReducer = combineReducers({
  [orgSlice.name]: orgSlice.reducer,
  [cardsSlice.name]: cardsSlice.reducer
  // Add your reducers here
})