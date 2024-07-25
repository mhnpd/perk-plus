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
import { EnrollUserBody, postEnrollUser } from '../../api/enroll-user'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { checkOrgExist } from '../../api/check-org-exist'
import { Loading } from '../../components/loading'



export default function EnrollInPerkMembership() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState<string | null>(null)
  const { handleSubmit, control, formState: { errors } } = useForm<EnrollUserBody>()

  useEffect(() => {
    checkOrgExist(organizationId!).then((response) => {
      if (response.status === 200) {
        setLoading(false)
      }
    }).catch((error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          navigate('/404')
        }
      }
    })
  }, [organizationId, navigate])

  const onSubmit = async (data: EnrollUserBody) => {
    try {
      const response = await postEnrollUser(organizationId!, data)
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
        </Paper>
      </Container>
    </>
  )
}
