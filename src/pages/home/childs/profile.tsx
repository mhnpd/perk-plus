import { Avatar, Box, Grid, Typography } from '@mui/material'

const user = {
  name: 'Georgeanna Ramero',
  role: 'Sales',
  company: 'Muller Inc',
  phoneNumber: '456-485-5623',
  email: 'qq739v47ggn@claimab.com',
  point: '1141',
  level: 'Silver',
  profileImage: 'https://modernize-nextjs.adminmart.com/images/profile/user-2.jpg'
}

const UserProfile = () => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Avatar
            src="https://modernize-nextjs.adminmart.com/images/profile/user-2.jpg"
            alt="Georgeanna Ramero"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.company}
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
                {user.point}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Level
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {user.level}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Phone Number
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: '400' }}>
            {user.phoneNumber}
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
            {user.company}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserProfile
