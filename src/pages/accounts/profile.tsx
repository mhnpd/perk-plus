import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../redux/slices/user'
import Typography from '@mui/material/Typography'
import { getDisplayName } from '../../shared/get-display-name'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'

function ProfilePage() {
  const user = useSelector(selectUserProfile)
  return (
    <>
      <Helmet>
        <title>{`Profile | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container fixed>
        <Paper elevation={2}>
          <Box sx={{ display: 'flex', p: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                Profile
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {getDisplayName(user)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Role:</strong> {user?.role}
              </Typography>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Avatar
                alt="Profile Image"
                src={user?.email}
                sx={{ width: 150, height: 150 }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  )
}

export { ProfilePage }
