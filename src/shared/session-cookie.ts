import Cookies from 'js-cookie'

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

export const getSessionCookie = () => {
  const sessionToken = Cookies.get('sessionToken')
  const userId = Cookies.get('userId')
  return { sessionToken, userId }
}

export const removeSessionCookie = () => {
  Cookies.remove('sessionToken', { path: '/', domain: window.location.hostname })
  Cookies.remove('userId', { path: '/', domain: window.location.hostname })
}