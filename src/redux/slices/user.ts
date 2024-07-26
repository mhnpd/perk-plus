import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { getUserProfile, User } from '../../api/user'


export interface UserState {
  profile: User | null
}

const initialState: UserState = {
  profile: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'user'
  }
}

const fetchuserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const profile = await getUserProfile()
    return profile
  })

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload
    },
    updateUserProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload
    },
    removeUserProfile(state) {
      state.profile = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserProfile.fulfilled, (state, action) => {
        state.profile = action.payload
      })
      .addCase(fetchuserProfile.rejected, (state) => {
        state.profile = null
      })
  }
})

export const { addUserProfile, updateUserProfile, removeUserProfile } =
  userSlice.actions

/** Selectors */
const selfSelector = (state: RootState) => state.user

export const selectProfile = (state: RootState) => selfSelector(state).profile
