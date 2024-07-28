import { useState, MouseEvent } from 'react'
import { Box, Button, Popover, TextField, Typography } from '@mui/material'

export interface InviteUserProps {
  onInvite: (email: string) => void
  buttonTitle: string
}

export const InviteUser = ({ onInvite, buttonTitle }: InviteUserProps) => {
  const [email, setEmail] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleInvite = () => {
    onInvite(email)
    handleClose()
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button
        aria-describedby={id}
        color="inherit"
        variant="text"
        onClick={handleClick}
      >
        {buttonTitle}
      </Button>
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
