import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'

export type PerkCardResponse = {
  perkCardId: string,
  googleWalletLink: string,
  issueDate: string,
  expiryDate: string,
}

const endpoint = (orgId: string) => `/v0/user/organization/${orgId}/cards`
export const getPerkCard = async (organizationId: string) => {
  const response = await axiosInstance.get<AxiosResponse<PerkCardResponse[]>>(
    endpoint(organizationId)
  )
  return response
}