import { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Popover from '@mui/material/Popover'
import { alpha } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { account } from '../_mock_data/account'
import { getDisplayName } from '../shared/get-display-name'
import { AppConfig } from '../constants/config'
import { useNavigate } from 'react-router-dom'
import { removeSessionCookie } from '../shared/session-cookie'

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    href: '/app',
  },
  {
    label: 'Profile',
    href: '/app/profile',
    icon: 'eva:person-fill'
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'eva:settings-2-fill'
  }
]

export function AccountPopover() {
  const navigate = useNavigate()
  const [open, setOpen] = useState<HTMLElement | null>(null)
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'r ...@gmail.com',
    photoURL: ''
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleLogout = () => {
    removeSessionCookie()
    navigate(AppConfig.LogoutRedirection)
  }

  const handleRedirect = (href: string) => {
    navigate(href)
  }

  return (
    <>
      <IconButton
        onClick={(event) => setOpen(event.currentTarget)}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open
            ? {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
            }
            : {})
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={getDisplayName(user)}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`
          }}
        >
          {getDisplayName(user).charAt(0)}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {getDisplayName(user)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={() => handleRedirect(option.href)}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  )
}
