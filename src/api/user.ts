import { AxiosResponse } from 'axios'
import axiosInstance from '../shared/axios-config'
import { setSessionCookie } from '../shared/session-cookie'

export interface User {
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  locale?: string
  profileImage?: string
  role: string
}

export enum UserRoutes {
  Login = 'no_auth/v0/users/login',
  user = '/v0/users/profile',
  Register = '/v0/users/register/:orgId',
  ChangePassword = '/v0/users/change-password',
  ChangeUserPassword = '/v0/users/change-user-password',
  UpdateProfile = '/v0/users/update-profile',
  MakeAdmin = '/v0/users/make-super-admin'
}

export interface LoginResponse {
  token: string
  user: User
}

export interface UserLoginBody {
  email: string
  password: string
}

export const postUserLogin = async ({
  email,
  password
}: UserLoginBody): Promise<AxiosResponse<LoginResponse>> => {
  const response: AxiosResponse<LoginResponse> = await axiosInstance.post(
    UserRoutes.Login,
    { email, password }
  )
  if (response.status === 200) {
    setSessionCookie(response.data.token, response.data.user.userId)
  }
  return response
}

export interface UserResigerPostBody {
  email: string
  orgId: string
  firstName: string
  lastName: string
  phone?: string
}

export const postUserRegister = async ({
  orgId,
  ...rest
}: UserResigerPostBody): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.post(
    UserRoutes.Register.replace(':orgId', orgId),
    rest
  )
  return response.data
}

export const postUserChangePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.post(
    UserRoutes.ChangePassword,
    { oldPassword, newPassword }
  )
  return response.data
}

/** @description can only be access by superAdmin in backend */
export const putUserChangeUserPassword = async (
  userId: number,
  newPassword: string
): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.post(
    UserRoutes.ChangeUserPassword,
    { userId, newPassword }
  )
  return response.data
}

export const postUserUpdateProfile = async (
  firstName: string,
  lastName: string,
  phone: string
): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.put(
    UserRoutes.UpdateProfile,
    { firstName, lastName, phone }
  )
  return response.data
}

export const postUserMakeAdmin = async (userId: number): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.post(
    UserRoutes.MakeAdmin,
    { userId }
  )
  return response.data
}

export const getUserProfile = async (): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.get(UserRoutes.user)
  return response.data
}
