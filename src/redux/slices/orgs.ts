/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit'
import {
  getOrganizationAdmins,
  getOrganizationMembers,
  getOrganizations,
  getOrganizationUsers,
  Organization
} from '../../api/orgs'
import { User } from '../../api/user'
import type { RootState } from '../store'

export interface OrgState {
  usersOrganization: Organization[]
  usersInOrganization: User[]
  organizationMembers: User[]
  organizationAdmins: User[]
  loading: boolean
  error: string | null
}

// Initial state
const initialState: OrgState = {
  usersOrganization: [],
  usersInOrganization: [],
  organizationMembers: [],
  organizationAdmins: [],
  loading: false,
  error: null
}

export const fetchOrganizations: any = createAsyncThunk<Organization[]>(
  'orgs/fetchOrganizations',
  async () => {
    const response = await getOrganizations()
    return response
  }
)

export const fetchOrganizationUsers: any = createAsyncThunk<User[], string>(
  'orgs/fetchOrganizationUsers',
  async (orgId) => {
    const users = await getOrganizationUsers(orgId)
    return users
  }
)

export const fetchOrganizationMembers: any = createAsyncThunk<User[], string>(
  'orgs/fetchOrganizationMembers',
  async (orgId) => {
    const members = await getOrganizationMembers(orgId)
    return members
  }
)

export const fetchOrganizationAdmins: any = createAsyncThunk<User[], string>(
  'orgs/fetchOrganizationAdmins',
  async (orgId) => {
    const admins = await getOrganizationAdmins(orgId)
    return admins
  }
)


// Create the slice
export const orgSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchOrganizations.fulfilled,
        (state, action: PayloadAction<Organization[]>) => {
          state.loading = false
          state.usersOrganization = action.payload
        }
      )
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch organizations'
      })
      .addCase(fetchOrganizationUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchOrganizationUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false
          state.usersInOrganization = action.payload
        }
      )
      .addCase(fetchOrganizationUsers.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch organization users'
      })
      .addCase(fetchOrganizationMembers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchOrganizationMembers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false
          state.organizationMembers = action.payload
        }
      )
      .addCase(fetchOrganizationMembers.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch organization members'
      })

      .addCase(fetchOrganizationAdmins.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchOrganizationAdmins.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false
          state.organizationAdmins = action.payload
        }
      )
      .addCase(fetchOrganizationAdmins.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || 'Failed to fetch organization admins'
      })
  }
})



// Selectors
const selectOrgsState = (state: RootState) => state.orgs

export const selectUsersOrganization = createSelector(
  [selectOrgsState],
  (orgs) => orgs.usersOrganization
)

export const selectUsersInOrganization = createSelector(
  [selectOrgsState],
  (orgs) => orgs.usersInOrganization
)

export const selectOrganizationMembers = createSelector(
  [selectOrgsState],
  (orgs) => orgs.organizationMembers
)

export const selectOrganizationAdmins = createSelector(
  [selectOrgsState],
  (orgs) => orgs.organizationAdmins
);

