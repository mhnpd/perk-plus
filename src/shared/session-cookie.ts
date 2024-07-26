import Cookies from 'js-cookie'
import { jwtDecode, JwtPayload } from 'jwt-decode'

export const setSessionCookie = (sessionToken: string, userId: string) => {
  const options = {
    secure: true,
    sameSite: 'Strict' as const,
    path: '/',
    domain: window.location.hostname,
  }

  Cookies.set('sessionToken', sessionToken, options)
  Cookies.set('userId', userId, options)
}

export const getAuthToken = () => {
  const sessionToken = Cookies.get('sessionToken')
  return sessionToken ? `Bearer ${sessionToken}` : ''
}

export const getSessionCookie = () => {
  const sessionToken = Cookies.get('sessionToken')
  const userId = Cookies.get('userId')
  return { sessionToken, userId }
}

export const removeSessionCookie = () => {
  Cookies.remove('sessionToken', { path: '/', domain: window.location.hostname })
  Cookies.remove('userId', { path: '/', domain: window.location.hostname })
}

export const isUserLoggedIn = () => {
  const sessionToken = Cookies.get('sessionToken')
  if (!sessionToken) {
    return false
  }

  try {
    const decodedToken = jwtDecode<JwtPayload>(sessionToken)
    const currentTime = Date.now() / 1000

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}