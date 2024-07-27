import React from 'react'
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

type FormValues = {
  fullName: string
  email: string
  phoneNumber: string
  country: string
  state: string
  city: string
  address: string
  zipCode: string
  company: string
  role: string
}

const countries = ['United States', 'Canada', 'United Kingdom']

const UserForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      address: '',
      zipCode: '',
      company: '',
      role: ''
    }
  })

  const onSubmit = (data: FormValues) => {
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
              name="fullName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full name"
                  variant="outlined"
                  size='medium'
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
                  label="Email address"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="phoneNumber"
              control={control}
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
              name="city"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="City" variant="outlined" fullWidth />
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
          <Grid item xs={12} sm={6}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Role" variant="outlined" fullWidth />
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
