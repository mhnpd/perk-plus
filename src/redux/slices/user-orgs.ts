/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RequestStatus } from "../types"
import { getUserOrgs, UserOrgsResponse } from "../../api/check-org-exist"

export interface UserOrgsState {
  userOrgs: UserOrgsResponse[]
  RequestStatus: RequestStatus
}

const initialState = {
  userOrgs: [],
  RequestStatus: RequestStatus.IDLE,
}
export const fetchUsersOrgsAsync: any = createAsyncThunk(
  'userOrgs/getUsersOrgs',
  async () => {
    const response = await getUserOrgs()
    return response.data
  }
)

const userOrgsSlice = createSlice({
  name: 'userOrgs',
  initialState,
  reducers: {},
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
  }
})

export const userOrgsSliceMountPoint = userOrgsSlice.name
export const userOrgsReducer = userOrgsSlice.reducer
