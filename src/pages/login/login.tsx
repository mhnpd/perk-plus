import { Helmet } from 'react-helmet-async'
import { LoginView } from './login-view'
import { AppConfig } from '../../constants/config'
import { useEffect } from 'react'
import { isUserLoggedIn } from '../../shared/session-cookie'


export default function LoginPage() {
  useEffect(() => {
    if (isUserLoggedIn()) {
      window.location.href = '/app'
    }
  })
  return (
    <>
      <Helmet><title>{`Login | ${AppConfig.AppName}`}</title></Helmet>
      <LoginView />
    </>
  )
}
