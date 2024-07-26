import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserProfile {
  id: string
  name: string
  email: string
}

export interface UserState {
  profile: UserProfile | null
}

const initialState: UserState = {
  profile: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
    },
    updateUserProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload
    },
    removeUserProfile(state) {
      state.profile = null
    }
  }
})

export const { addUserProfile, updateUserProfile, removeUserProfile } =
  userSlice.actions

/** Selectors */
const selfSelector = (state: RootState) => state.user

export const selectProfile = (state: RootState) => selfSelector(state).profile
