import { combineReducers } from "@reduxjs/toolkit"
import { userOrgsReducer, userOrgsSliceMountPoint } from "./slices/user-orgs"
import { cardsReducer, cardsSliceMountPoint } from './slices/cards'

export const rootReducer = combineReducers({
  [userOrgsSliceMountPoint]: userOrgsReducer,
  [cardsSliceMountPoint]: cardsReducer
  // Add your reducers here
})