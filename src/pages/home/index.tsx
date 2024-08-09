import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Container from '@mui/material/Container'
import LoyaltyCard from './loyalty-card'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import TimelineComponent from './childs/timeline'
import { Divider } from '@mui/material'
import UserProfile from './childs/profile'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{`Home | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container maxWidth="xl">
        <Card component={Stack} direction="row" sx={{ px: 3, py: 5, borderRadius: 2 }}>
          <Grid container>
            <Grid item xs={12} md={4}>
              <UserProfile />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ ml: 3, mr: 3 }} />
            <Grid item xs={12} md={4}>
              <TimelineComponent />
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ ml: 3 }} />
            <Grid item xs={12} md={3} sx={{ alignSelf: 'flex-end' }}>
              <Box sx={{ pl: 4 }}>
                <LoyaltyCard />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container >
    </>
  )
}
