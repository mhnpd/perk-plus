import { Helmet } from 'react-helmet-async'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'

import { AppConfig } from '../../constants/config'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

type EnrollmentFormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export default function EnrollInPerkMembership() {
  const { handleSubmit, control } = useForm<EnrollmentFormData>()

  const onSubmit = (data: EnrollmentFormData) => {
    console.log(data)
  }

  return (
    <>
      <Helmet>
        <title>{`Enroll Perk Membership | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
        <Paper elevation={4}>
          <Card sx={{ padding: '30px' }}>
            <Box marginBottom='10px'>
              <Typography textAlign="center" variant="h4">
                Join Perk Membership
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
              <Box display='flex' justifyContent='flex-end' marginTop='10px'>
                <Button
                  sx={{ marginTop: '10px' }}
                  type="submit"
                  variant="contained"
                  color="inherit"
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Card>
        </Paper>
      </Container>
    </>
  )
}
