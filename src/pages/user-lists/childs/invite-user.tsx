import { useState, MouseEvent } from 'react'
import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export interface InviteUserProps {
  onInvite?: (email: string) => Promise<AxiosResponse<string>>
}

export const InviteUser = ({ onInvite }: InviteUserProps) => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setError('')
    setAnchorEl(null)
  }

  const handleInvite = async () => {
    try {
      onInvite && (await onInvite(email))
      handleClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <IconButton onClick={handleClick}>
        <PersonAddIcon style={{ color: '#6c757d' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Box display='flex' flexDirection='column' sx={{ p: 2 }}>
          <Typography variant="subtitle1">
            Add members to your organization
          </Typography>
          <TextField
            label="Email"
            type="email"
            size='small'
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
          />
          <Button aria-describedby={id}
            color="inherit"
            variant="contained"
            onClick={handleInvite}
            sx={{ mt: 2 }}
          >
            Invite
          </Button>
        </Box>
      </Popover>
    </div>
  )
}
