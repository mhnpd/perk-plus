import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'

const endpoint = (orgId: string) => `/no-auth/v0/organization_exist/${orgId}`

export const checkOrgExist = async (orgId: string) => {
  const response = await axiosInstance.get(endpoint(orgId))
  return response
}

export interface UserOrgsResponse {
  organizationId: string
  name: string
}

export const getUserOrgs = async () => {
  const endpoint = '/v0/get_users_organization'
  const response = await axiosInstance.get<
    undefined,
    AxiosResponse<UserOrgsResponse[]>
  >(endpoint)
  return response
}


