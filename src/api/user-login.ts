import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import axiosInstance from '../shared/axios-config'

const endpoint = '/no-auth/v0/login'

export interface UserLoginBody {
  email: string
  password: string
}

export interface UserLoginResponse {
  sessionToken: string
  user: {
    userId: string
    email: string
    firstName: string
    lastName: string
  }
}

const cookiesConfiguration: Cookies.CookieAttributes = {
  path: '/',
  secure: true,
  sameSite: 'strict',
}

export function getAuthToken() {
  return Cookies.get('sessionToken')
}

export function removeAuthToken() {
  Cookies.remove('sessionToken')
  Cookies.remove('userId')
}

export function isUserLoggedIn() {
  return Boolean(Cookies.get('sessionToken'))
}

export function getUserId() {
  return Cookies.get('userId')
}



export const postUserLogin = async (
  data: UserLoginBody
): Promise<AxiosResponse<UserLoginResponse>> => {
  const response = await axiosInstance.post<
    UserLoginBody,
    AxiosResponse<UserLoginResponse>
  >(endpoint, data)
  if (response.status === 200) {
    Cookies.set('sessionToken', response.data.sessionToken, cookiesConfiguration)
    Cookies.set('userId', response.data.user.userId, cookiesConfiguration)
  }
  return response
}
