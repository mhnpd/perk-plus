import { useState, ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import Nav from './nav'
import Main from './main'
import Header from './header'
import { useDispatch } from 'react-redux'
import { isUserLoggedIn } from '../shared/session-cookie'
import { fetchOrganizations } from '../redux/slices/orgs'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openNav, setOpenNav] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isUserLoggedIn()) {
      dispatch(fetchOrganizations())
    }
  }, [dispatch])

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </>
  )
}
