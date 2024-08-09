import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'

import { usePathname } from '../../hooks/use-pathname'
import { useResponsive } from '../../hooks/use-responsive'
import { Logo } from '../../components/logo'
import { Scrollbar } from '../../components/scrollbar'
import { NAV } from '../config-layout'
import navConfig from '../config-navigation'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../redux/slices/user'
import { getDisplayName } from '../../shared/get-display-name'
import { NavItem } from './nav-item'
import AccountBox from './account-box'

interface NavProps {
  openNav: boolean
  onCloseNav: () => void
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname()
  const user = useSelector(selectProfile)
  const upLg = useResponsive('up', 'lg')

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />

      <AccountBox user={user} getDisplayName={getDisplayName} />

      <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </Stack>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  )

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH }
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH
            }
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  )
}
