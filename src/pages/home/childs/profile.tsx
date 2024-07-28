import { Avatar, Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getDisplayName } from '../../../shared/get-display-name'
import { User } from '../../../api/user'
import { selectCard } from '../../../redux/slices/cards'
import { Card } from '../../../api/card'
import { selectProfile } from '../../../redux/slices/user'


const UserProfile = () => {
  const user = useSelector(selectProfile) as User
  const card = useSelector(selectCard) as Card
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            src="https://modernize-nextjs.adminmart.com/images/profile/user-2.jpg"
            alt={getDisplayName(user!)}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">{getDisplayName(user!)}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2} direction="column">
        <Grid item>
          <Grid container spacing={2} flexDirection='row'>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Point
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {card ? card?.cardId : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Level
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {/* TODO: complete it later */}
                Not available
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Phone Number
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '400' }}>
            {user.phone || 'Not available'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Email Address
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '400' }}>
            {user.email}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Company
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {/* TODO: Not available */}
            Not available
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserProfile
