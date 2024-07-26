import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Container from '@mui/material/Container'
import LoyaltyCard from './loyalty-card'
import Box from '@mui/material/Box'

export default function Home() {

  return (
    <>
      <Helmet>
        <title>{`Home | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container fixed>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
          }}
        >
          <LoyaltyCard />
        </Box>
      </Container>
    </>
  )
}
