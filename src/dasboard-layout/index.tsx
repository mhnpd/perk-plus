import { useState, ReactNode, useEffect } from 'react'
import Box from '@mui/material/Box'
import Nav from './nav'
import Main from './main'
import Header from './header'
import { fetchUsersOrgsAsync } from '../redux/slices/user-orgs'
import { useDispatch } from 'react-redux'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [openNav, setOpenNav] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersOrgsAsync())
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
