/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../types"
import type { RootState } from "../store"
import { getPerkCard, PerkCardResponse } from "../../api/get-perk-card"

const getOwnState = (state: RootState) => state.cards

export interface UserState {
  cards: PerkCardResponse[],
  requestStatus: RequestStatus
}


const initialState: UserState = {
  cards: [],
  requestStatus: RequestStatus.IDLE,
}
export const fetchPerkCard: any = createAsyncThunk(
  'userOrgs/getUsersOrgs',
  async (orgId: string) => {
    const response = await getPerkCard(orgId)
    return response.data
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerkCard.pending, (state) => {
        state.requestStatus = RequestStatus.PENDING
      })
      .addCase(fetchPerkCard.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.FULFILLED
        state.cards = action.payload
      })
  }
})

export const selectUserProfile = createSelector(getOwnState, s => s.cards)

export const cardsSliceMountPoint = cardsSlice.name
export const cardsReducer = cardsSlice.reducer
