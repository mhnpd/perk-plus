import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'
import { User } from './user'

export interface Organization {
  organizationId: string
  name: string
  email?: string
  phone?: string
  banner?: string
  logo?: string
}

export enum OrgRoutes {
  Organizations = '/v0/organizations',
  OrganizationById = '/v0/organizations/:orgId',
  OrganizationExists = '/v0/organizations/:orgId/exists',
  AddOrganizationMember = '/v0/organizations/:orgId/add-member',
  AddOrganizationAdmin = '/v0/organizations/:orgId/add-admin',
  OrganizationUsers = '/v0/organizations/:orgId/users',
  OrganizationMembers = '/v0/organizations/:orgId/members',
  OrganizationAdmins = '/v0/organizations/:orgId/admins',
  AllOrganizations = '/v0/organizations/all'
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
): Promise<string> => {
  const response = await axiosInstance.get(
    OrgRoutes.OrganizationExists.replace(':orgId', orgId)
  )
  return response.data
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
  memberId: string
): Promise<string> => {
  const response = await axiosInstance.put<string>(
    OrgRoutes.AddOrganizationMember.replace(':orgId', orgId),
    { memberId }
  )
  return response.data
}

// Add new admin to organization
export const addOrganizationAdmin = async (
  orgId: string,
  adminId: string
): Promise<string> => {
  const response = await axiosInstance.put<string>(
    OrgRoutes.AddOrganizationAdmin.replace(':orgId', orgId),
    { adminId }
  )
  return response.data
}
