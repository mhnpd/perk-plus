import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPerkCard, selectAllCards } from '../../redux/slices/cards'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Container from '@mui/material/Container'
import LoyaltyCard from './loyalty-card'
import Box from '@mui/material/Box'

export default function Home() {
  const dispatch = useDispatch()
  const cards = useSelector(selectAllCards)

  useEffect(() => {
    dispatch(fetchPerkCard('1234'))
  }, [dispatch])

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
