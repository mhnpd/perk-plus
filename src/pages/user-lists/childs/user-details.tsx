import { Box, Avatar, Typography, Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { User } from '../../../api/user'
import { getDisplayName } from '../../../shared/get-display-name'
import EmptyPlaceHolder from './nothing.svg'

interface UserDetailsProps {
  user: User | undefined | null
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5
        }}
      >
        <img
          style={{ width: '200px', height: '200px' }}
          src={EmptyPlaceHolder}
          alt="no user"
        />
        <Box sx={{ mt: 5, width: 300, textAlign: 'center' }}>
          <Typography variant="body1" color="grey">
            No users found. The user list is currently empty or contains no members.
          </Typography>
        </Box>
      </Box>
    )
  }
  return (
    <>
      <Box sx={{ ml: 4, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 5 }}>
          <Avatar
            // TODO: Change this to user.profileImage
            src="https://modernize-nextjs.adminmart.com/images/profile/user-3.jpg"
            sx={{ width: 90, height: 90 }}
          />
          <Box sx={{ marginLeft: 2 }}>
            <Typography variant="h6">{getDisplayName(user)}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.role}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.profileImage ?? 'Company name not available'}
            </Typography>
          </Box>
        </Box>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">{user.phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Email Address
            </Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Address
          </Typography>
          <Typography variant="body1" color={user.profileImage ?? 'GrayText'}>
            {user.profileImage ?? 'Not available'}
          </Typography>
        </Box>
        <Grid
          container
          justifyContent="space-between"
          sx={{ mt: 2, pb: 5 }}
          spacing={3}
        >
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1" color={user.profileImage ?? 'GrayText'}>
              {user.profileImage ?? 'Not available'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Company
            </Typography>
            <Typography variant="body1" color={user.profileImage ?? 'GrayText'}>
              {user.profileImage ?? 'Not available'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
    </>
  )
}
