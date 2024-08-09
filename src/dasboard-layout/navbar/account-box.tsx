import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { User } from '../../api/user'

interface AccountBoxProps {
  user: User | null
  getDisplayName: (user: User | null) => string
}

const AccountBox: React.FC<AccountBoxProps> = ({ user, getDisplayName }) => {
  return (
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
      <Avatar src={user?.profileImage} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{getDisplayName(user)}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {user?.email}
        </Typography>
      </Box>
    </Box>
  )
}

export default AccountBox
