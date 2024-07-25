import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { postUserLogin, UserLoginBody } from '../../api/user-login'
import { Background } from '../../components/background'
import { Iconify } from '../../components/iconify'
import { AppConfig } from '../../constants/config'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import Collapse from '@mui/material/Collapse'
import { useDispatch } from 'react-redux'
import { setUserProfile } from '../../redux/slices/user-orgs'

export function LoginView() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const { handleSubmit, control, formState: { errors } } = useForm<UserLoginBody>()

  const onFormSubmit = async (data: UserLoginBody) => {
    try {
      const response = await postUserLogin(data)
      if (response.status === 200) {
        dispatch(setUserProfile(response.data.user))
        navigate('/app')
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setServerError('Invalid email or password')
        }
        if (error.response?.status === 403) {
          setServerError('Please check you email for verification link')
        }
      }
    }
  }

  return (
    <Background disabledLogo={false}>
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420
          }}
        >
          <Box mb={5}>
            <Typography variant="h4">{`Sign in to ${AppConfig.AppName}`}</Typography>
          </Box>
          <Stack spacing={3}>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Password is required'
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            <Iconify
                              icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                            />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              <Collapse in={!!serverError}>
                <Box display='flex' justifyContent='center' >
                  {serverError && (
                    <Typography color="error" marginBottom="10px">
                      {serverError}
                    </Typography>
                  )}
                </Box>
              </Collapse>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{ my: 3 }}
              >
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
              >
                Login
              </LoadingButton>
            </form>
          </Stack>
        </Card>
      </Stack>
    </Background>
  )
}

