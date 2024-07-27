import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Container from '@mui/material/Container'
import LoyaltyCard from './loyalty-card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'

export default function Home() {

  return (
    <>
      <Helmet>
        <title>{`Home | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>
        <Card
          component={Stack}
          spacing={3}
          direction="row"
          sx={{
            px: 3,
            py: 5,
            borderRadius: 2,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src="https://source.unsplash.com/animal"
                  alt="random"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <LoyaltyCard />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}
