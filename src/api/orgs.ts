import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'
import { User } from './user'

export interface Organization {
  organizationId: string
  name: string
  email?: string
  phone?: string
  banner?: File | string
  logo?: File | string
}
export enum OrgRoutes {
  /** Organization routes */
  Organizations = '/v0/organizations',
  OrganizationById = '/v0/organizations/:orgId',
  OrganizationExists = '/v0/organizations/:orgId/exists',

  /** Organization User routes */
  OrganizationUsers = '/v0/organizations/:orgId/users',

  /** Organization Member routes */
  AddOrganizationMember = '/v0/organizations/:orgId/add-member',
  OrganizationMembers = '/v0/organizations/:orgId/members',
  OrganizationMember = '/v0/organizations/:orgId/members/:userId',

  /** Organization Admin routes */
  OrganizationAdmins = '/v0/organizations/:orgId/admins',
  AddOrganizationAdmin = '/v0/organizations/:orgId/add-admin',
  OrganizationAdmin = '/v0/organizations/:orgId/admins/:userId',

  /** Super admin routes */
  AllOrganizations = '/v0/organizations/all',
}

// Get all user-readable organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  const response: AxiosResponse<Organization[]> = await axiosInstance.get<
    Organization[]
  >(OrgRoutes.Organizations)
  return [...response.data]
}

// Create an organization
export const createOrganization = async (
  organizationData: Organization
): Promise<string> => {
  const response = await axiosInstance.post(
    OrgRoutes.Organizations,
    organizationData
  )
  return response.data
}

// Get organization details by organizationId
export const getOrganizationById = async (
  orgId: string
): Promise<Organization> => {
  const response: AxiosResponse<Organization> =
    await axiosInstance.get<Organization>(
      OrgRoutes.OrganizationById.replace(':orgId', orgId)
    )
  return response.data
}

// Update organization details by organizationId
export const updateOrganizationById = async (
  orgId: string,
  organizationData: Partial<Organization>
): Promise<string> => {
  const response = await axiosInstance.put(
    OrgRoutes.OrganizationById.replace(':orgId', orgId),
    organizationData
  )
  return response.data
}

// Check if organization exists
export const checkOrganizationExists = async (
  orgId: string
): Promise<AxiosResponse<void>> => {
  const response = await axiosInstance.get<void>(
    OrgRoutes.OrganizationExists.replace(':orgId', orgId)
  )
  return response
}

// Get all users in the organization
export const getOrganizationUsers = async (orgId: string): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axiosInstance.get<User[]>(
    OrgRoutes.OrganizationUsers.replace(':orgId', orgId)
  )
  return response.data
}

// Get all members in the organization
export const getOrganizationMembers = async (
  orgId: string
): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axiosInstance.get<User[]>(
    OrgRoutes.OrganizationMembers.replace(':orgId', orgId)
  )
  return response.data
}

// Get all admins in the organization
export const getOrganizationAdmins = async (
  orgId: string
): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axiosInstance.get<User[]>(
    OrgRoutes.OrganizationAdmins.replace(':orgId', orgId)
  )
  return response.data
}

// Add new member to organization
export const addOrganizationMember = async (
  orgId: string,
  email: string
): Promise<AxiosResponse<string, { message: string }>> => {
  const response = await axiosInstance.put<string>(
    OrgRoutes.AddOrganizationMember.replace(':orgId', orgId),
    { email }
  )
  return response
}

// Add new admin to organization
export const addOrganizationAdmin = async (
  orgId: string,
  email: string
): Promise<AxiosResponse<string>> => {
  const response = await axiosInstance.put<string>(
    OrgRoutes.AddOrganizationAdmin.replace(':orgId', orgId),
    { email }
  )
  return response
}

// Remove member from organization
export const removeOrganizationMember = async (
  orgId: string,
  userId: string
): Promise<AxiosResponse<string>> => {
  const response = await axiosInstance.delete<string>(
    OrgRoutes.OrganizationMember.replace(':orgId', orgId).replace(':userId', userId)
  )
  return response
}

// Remove admin from organization
export const removeOrganizationAdmin = async (
  orgId: string,
  userId: string
): Promise<AxiosResponse<string>> => {
  const response = await axiosInstance.delete<string>(
    OrgRoutes.OrganizationAdmin.replace(':orgId', orgId).replace(':userId', userId)
  )
  return response
}
