import React from 'react'
import {getNames} from 'country-list'
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
import { User } from '../../../api/user'

const countries = getNames()

const UserForm: React.FC<{ user: User }> = ({ user }) => {
  const { control, handleSubmit } = useForm<User>({
    defaultValues: { ...user }
  })

  const onSubmit = (data: User) => {
    console.log(data)
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full name"
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email address"
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
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
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
              name="phone"
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
              >
                Create user
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}

export default UserForm
