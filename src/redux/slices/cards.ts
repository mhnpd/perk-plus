/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../types"
import type { RootState } from "../store"
import { Card, getCards } from "../../api/card"


const getOwnState = (state: RootState) => state.cards

export interface UserState {
  cards: Card[]
  requestStatus: RequestStatus
}


const initialState: UserState = {
  cards: [],
  requestStatus: RequestStatus.IDLE,
}
export const fetchCard: any = createAsyncThunk(
  'userOrgs/getUsersOrgs',
  async () => {
    const response = await getCards()
    return response
  }
)

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCard.pending, (state) => {
        state.requestStatus = RequestStatus.PENDING
      })
      .addCase(fetchCard.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.FULFILLED
        state.cards = action.payload
      })
  }
})

export const selectAllCards = createSelector(getOwnState, s => s.cards)


