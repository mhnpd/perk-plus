import React, { useState } from 'react'
import {
  IconButton,
  Popover,
  Typography,
  Button,
  Grid,
  Box,
  Alert,
  CircularProgress
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { User } from '../../../api/user'
import { AxiosError, AxiosResponse } from 'axios'

interface RemoveUserPopoverProps {
  user: User
  onRemove: (user: string) => Promise<AxiosResponse<string>>
}

const RemoveUserPopover: React.FC<RemoveUserPopoverProps> = ({
  onRemove,
  user
}) => {
  const [error, setError] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setError(null)
    setAnchorEl(null)
  }

  const handleRemove = async () => {
    setIsRequesting(true)
    try {
      await onRemove(user.userId)
      handleClose()
    } catch (error) {
      setIsRequesting(false)
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    } finally {
      setIsRequesting(false)
    }
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined



  return (
    <div>
      <IconButton aria-describedby={id} disabled={!user} onClick={handleClick}>
        <DeleteIcon />
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
        <Grid container justifyContent="center" flexDirection="column">
          <Grid item sx={{ m: 3 }}>
            <Typography variant="body2">
              This action will remove the user from
              <br />
              selected organizations. Are you sure?
            </Typography>
          </Grid>
          {error && (
            <Grid item sx={{ m: 3, mt: 0 }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          <Grid item>
            <Box display="flex" justifyContent="flex-end" sx={{ m: 3, mt: 0 }}>
              <Button variant="text" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                sx={{ ml: 1 }}
                variant="contained"
                color="inherit"
                onClick={handleRemove}
                disabled={isRequesting}
                endIcon={isRequesting && <CircularProgress color='info' size={20} />}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Popover>
    </div>
  )
}

export default RemoveUserPopover
