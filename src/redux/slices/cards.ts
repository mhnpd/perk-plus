/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../types"
import type { RootState } from "../store"
import { Card, getCards } from "../../api/card"


const getOwnState = (state: RootState) => state.cards

export interface UserState {
  card: Card | null
  requestStatus: RequestStatus
}


const initialState: UserState = {
  card: null,
  requestStatus: RequestStatus.IDLE,
}
export const fetchCard: any = createAsyncThunk(
  'card/fetchCard',
  async (orgId: string) => {
    const response = await getCards(orgId)
    return response.data
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
        state.card = action.payload
      })
  }
})

export const selectCard = createSelector(getOwnState, s => s.card)


