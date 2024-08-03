import React from 'react'
import { getNames } from 'country-list'
import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Card
} from '@mui/material'
import { postUserUpdateProfile, User } from '../../../api/user'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../../../redux/slices/user'

const countries = getNames()

const UserForm: React.FC<{ user: User | null }> = ({ user }) => {
  const dispatch = useDispatch()
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<User>({
    defaultValues: { ...user }
  })

  const onSubmit = async (data: User) => {
   const user = await postUserUpdateProfile(data)
   dispatch(updateUserProfile(user))
  }

  return (
    <Card sx={{ p: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ flexGrow: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: 'Last name is required',
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: 'Invalid last name'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First name *"
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: 'Last name is required',
                pattern: {
                  value: /^[a-zA-Z ]+$/,
                  message: 'Invalid last name'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name *"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
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
                  label="Email *"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              rules={{
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Invalid phone number'
                }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select {...field} label="Country">
                    {countries.map((country) => (
                      <MenuItem key={country} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State/region"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="zipCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zip/code"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="inherit"
                disabled={isSubmitting}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default UserForm
