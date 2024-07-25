import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'

export type EnrollUserBody = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface EnrollUserResponse {
  message: string
}

const endpoint = (orgId: string) => `/no-auth/v0/enroll_user/${orgId}`

export const postEnrollUser = async (orgId: string, data: EnrollUserBody) => {
  const response = await axiosInstance.post<
    EnrollUserBody,
    AxiosResponse<EnrollUserResponse>
  >(endpoint(orgId), data)
  return response
}
