import React from 'react'
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  Button
} from '@mui/material'
import { styled } from '@mui/system'
import GoogleIcon from '@mui/icons-material/Google'
import barcodeImage from './qrcode.png'

const CardWrapper = styled(Card)(() => ({
  maxWidth: '290px',
  overflow: 'hidden',
  backgroundColor: '#4285F4'
}))

const LogoImage = styled('img')({
  color: 'white',
  width: '35px',
  height: '35px',
  borderRadius: '50%',
  objectFit: 'cover'
})

const BarcodeContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  marginTop: '16px',
  padding: '8px'
})

const BarcodeImg = styled('img')({
  width: '150px',
  margin: '4px',
  borderRadius: '8px',
  borderWidth: '10px',
  borderStyle: 'solid',
  borderColor: 'white'
})

const LoyaltyCard: React.FC = () => {
  return (
    <Box>
      <CardWrapper elevation={4}>
        <Box>
          <Grid container alignItems="center">
            <Grid
              item
              xs={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
              }}
            >
              <LogoImage
                src="https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg"
                alt="Google logo"
              />
            </Grid>
            <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography color="white" variant="h6" component="div">
                Google I/O '22
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ pl: 2, pt: 1 }}>
          <Typography variant="subtitle1" color="white">
            Attendee
          </Typography>
          <Typography variant="h5" color="white" component="div">
            Alex McJacobs
          </Typography>
        </Box>
        <Box sx={{ mt: 2, pl: 2 }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={6}>
              <Typography variant="body2" color="white">
                POINTS
              </Typography>
              <Typography variant="h6" color="white" component="div">
                1112
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'right', mr: 2 }}>
              <Typography variant="body2" color="white">
                Level
              </Typography>
              <Typography variant="h6" color="white" component="div">
                Silver
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <BarcodeContainer>
          <BarcodeImg src={barcodeImage} alt="Aztec barcode" width={500} />
        </BarcodeContainer>
        <CardMedia
          component="img"
          image="https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/google-io-hero-demo-only.png"
          alt="Event banner"
        />
      </CardWrapper>
      <Box sx={{ mt: 2, ml: 8 }}>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<GoogleIcon />}
          sx={{ borderRadius: '20px', padding: '10px 20px' }}
          onClick={() => {
            // Handle add to wallet action here
            alert('Add to Wallet clicked!')
          }}
        >
          <Typography variant="inherit">Add to Wallet</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default LoyaltyCard
