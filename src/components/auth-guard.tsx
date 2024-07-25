import React from 'react'
import { Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '../api/user-login'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = isUserLoggedIn()

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return <>{children} </>
}

export default AuthGuard