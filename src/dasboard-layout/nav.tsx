import { ReactNode, useEffect } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { usePathname } from '../hooks/use-pathname'
import { RouterLink } from '../shared/router-link'
import { useResponsive } from '../hooks/use-responsive'
import { account } from '../_mock_data/account'
import { Logo } from '../components/logo'
import { Scrollbar } from '../components/scrollbar'
import { NAV } from './config-layout'
import navConfig from './config-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, selectUserProfile } from '../redux/slices/user-orgs'
import { getDisplayName } from '../shared/get-display-name'

interface NavProps {
  openNav: boolean
  onCloseNav: () => void
}

interface NavItemProps {
  item: {
    title: string
    path: string
    icon: ReactNode
  }
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname()
  const dispatch = useDispatch()
  const user = useSelector(selectUserProfile)

  const upLg = useResponsive('up', 'lg')

  // Fetch user profile
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12)
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{getDisplayName(user)}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  )

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item: NavItemProps['item']) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  )

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

      {renderAccount}

      {renderMenu}

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

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname()

  const active = item.path === pathname

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16)
          }
        })
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  )
}
