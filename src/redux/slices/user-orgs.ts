/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../types"
import { getUserOrgs, UserOrgsResponse } from "../../api/check-org-exist"
import { getUserProfile, User } from "../../api/user-login"
import type { RootState } from "../store"

const getOwnState = (state: RootState) => state.userOrgs

export interface UserState {
  userOrgs: UserOrgsResponse[]
  userProfile: User | null
  RequestStatus: RequestStatus
}


const initialState: UserState = {
  userOrgs: [],
  userProfile: null,
  RequestStatus: RequestStatus.IDLE,
}
export const fetchUsersOrgsAsync: any = createAsyncThunk(
  'userOrgs/getUsersOrgs',
  async () => {
    const response = await getUserOrgs()
    return response.data
  }
)

export const fetchUserProfile: any = createAsyncThunk(
  'userOrgs/getUserProfile',
  async (_, { getState }) => {
    const state = getState() as RootState
    const profile = state.userOrgs.userProfile
    if (profile) {
      return profile
    } else {
      const response = await getUserProfile()
      console.log(response.data)
      return response.data
    }
  }
)

const userOrgsSlice = createSlice({
  name: 'userOrgs',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersOrgsAsync.pending, (state) => {
        state.RequestStatus = RequestStatus.PENDING
      })
      .addCase(fetchUsersOrgsAsync.fulfilled, (state, action) => {
        state.RequestStatus = RequestStatus.FULFILLED
        state.userOrgs = action.payload
      })
      .addCase(fetchUsersOrgsAsync.rejected, (state) => {
        state.RequestStatus = RequestStatus.REJECTED
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.RequestStatus = RequestStatus.PENDING
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.RequestStatus = RequestStatus.FULFILLED
        state.userProfile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.RequestStatus = RequestStatus.REJECTED
      })
  }
})

export const selectUserProfile = createSelector(getOwnState, s => s.userProfile)

export const { setUserProfile } = userOrgsSlice.actions
export const userOrgsSliceMountPoint = userOrgsSlice.name
export const userOrgsReducer = userOrgsSlice.reducer
