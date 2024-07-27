import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { AppConfig } from '../../constants/config'
import { Background } from '../../components/background'
import { Loading } from '../../components/loading'
import { postUserRegister, UserResigerPostBody } from '../../api/user'
import { checkOrganizationExists } from '../../api/orgs'



export default function EnrollInPerkMembership() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState<string | null>(null)
  const { handleSubmit, control, formState: { errors } } = useForm<UserResigerPostBody>()

  useEffect(() => {
    checkOrganizationExists(organizationId!).then((response) => {
      if (response.status === 200) {
        setLoading(false)
      }
    }).catch((error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          navigate('/404')
          // setLoading(false)
        }
      }
    })
  }, [organizationId, navigate])

  const onSubmit = async (data: UserResigerPostBody) => {
    try {
      const response = await postUserRegister(organizationId!, data)
      if (response.status === 200) {
        // Redirect to success page
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response)
        if (error.response?.status === 402) {
          setServerError(error.response.data)
        }
        if (error.response?.status === 404) {
          setServerError(error.response.data)
        }
      }
    }
  }

  // if organization id check is being done, show loading spinner
  if (loading) return <Loading />

  // Redirect to 404 page if organizationId is not present
  if (!organizationId) return

  return (
    <Background>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Helmet>
          <title>{`Enroll Perk Membership | ${AppConfig.AppName}`}</title>
        </Helmet>
        <Container maxWidth="sm">
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
                rules={{
                  required: 'First Name is required',
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Invalid first name'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Last Name is required',
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: 'Invalid last name'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Phone Number is required',
                  pattern: {
                    value: /^[0-9]{10,}$/,
                    message: 'Invalid phone number'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone?.message}
                  />
                )}
              />
              {serverError && (
                <Typography color='error' marginBottom='10px'>
                  {serverError}
                </Typography>
              )}
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
        </Container>
      </Stack>
    </Background >
  )
}
