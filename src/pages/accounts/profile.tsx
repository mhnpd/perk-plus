import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Container from '@mui/material/Container'
import UserForm from './childs/profile-update'
import Grid from '@mui/material/Grid'
import UserPhotoUpload from './childs/profile-photo'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../redux/slices/user'

function ProfilePage() {
  const profile = useSelector(selectProfile)
  return (
    <>
      <Helmet>
        <title>{`Profile | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <UserPhotoUpload />
          </Grid>
          <Grid item xs={12} md={8}>
            <UserForm user={profile} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export { ProfilePage }
