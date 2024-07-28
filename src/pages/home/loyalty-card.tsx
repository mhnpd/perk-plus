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
import { useSelector } from 'react-redux'
import { selectCard } from '../../redux/slices/cards'
import { selectUsersOrganization } from '../../redux/slices/orgs'
import { getDefaultOrg, selectProfile } from '../../redux/slices/user'
import { getDisplayName } from '../../shared/get-display-name'

const CardWrapper = styled(Card)(() => ({
  maxWidth: '260px',
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
  const card = useSelector(selectCard)
  const orgs = useSelector(selectUsersOrganization)
  const defaultOrgs = useSelector(getDefaultOrg)
  const user = useSelector(selectProfile)
  const currentOrg = orgs.find((org) => org.organizationId === defaultOrgs)
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
              <Typography color="white" variant="body1" component="div">
                {currentOrg?.name.slice(0, 15)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ pl: 2, pt: 1 }}>
          <Typography variant="subtitle1" color="white">
            Attendee
          </Typography>
          <Typography variant="h6" color="white" component="div">
            {getDisplayName(user)}
          </Typography>
        </Box>
        <Box sx={{ pl: 2, pt: 1 }}>
          <Typography variant="subtitle1" color="white">
            {card?.cardId}
          </Typography>
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
          component='a'
          color="inherit"
          startIcon={<GoogleIcon />}
          sx={{ borderRadius: '20px', padding: '10px 20px' }}
          href={card?.googleWalletLink}
        >
          <Typography variant="inherit">Add to Wallet</Typography>
        </Button>
      </Box>
    </Box>
  )
}

export default LoyaltyCard
