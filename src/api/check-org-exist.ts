import axiosInstance from "../shared/axios-config"

const endpoint = (orgId: string) => `/no-auth/v0/organization_exist/${orgId}`

export const checkOrgExist = async (orgId: string) => {
  const response = await axiosInstance.get(endpoint(orgId))
  return response
}

