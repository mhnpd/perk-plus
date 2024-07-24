import { Helmet } from 'react-helmet-async'
import { LoginView } from './login-view'
import { AppConfig } from '../../constants/config'


export default function LoginPage() {
  return (
    <>
      <Helmet><title>{`Login | ${AppConfig.AppName}`}</title></Helmet>
      <LoginView />
    </>
  )
}
