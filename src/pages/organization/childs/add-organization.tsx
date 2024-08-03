import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Box, styled } from '@mui/material'
import Grid from '@mui/material/Grid'
import { createOrganization, Organization } from '../../../api/orgs'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { uploadFile } from '../../../api/file'
import { useDispatch } from 'react-redux'
import { fetchOrganizations } from '../../../redux/slices/orgs'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const getFileFromEvent = (files: FileList | undefined | null): File | undefined => {
  if (!files) return undefined
  return files[0]
}

const AddOrganization = () => {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<Organization>()

  const onSubmit = async (data: Organization) => {
    const {banner, logo, ...rest } = data

    let bannerId:string  = ''
    let logoId: string = ''

    if (banner && banner instanceof File) {
      const assets = await uploadFile(banner)
      bannerId = assets.public_id
    }
    if (logo && logo instanceof File) {
      const assets = await uploadFile(logo)
      logoId = assets.public_id
    }

    const organizationData = {
      ...rest,
      banner: bannerId,
      logo: logoId
    }
    await createOrganization(organizationData)
    await dispatch(fetchOrganizations())
  }

  return (
    <Box sx={{ p: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name *"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
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
                  label="Email *"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="website"
              control={control}
              defaultValue=""
              rules={
                {
                  pattern: {
                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                    message: 'Invalid website url'
                  }
                }
              }
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Website"
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
              defaultValue=""
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
              name="banner"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ height: '53px' }}
                >
                  {(field.value as File).name || 'Select logo'}
                  <VisuallyHiddenInput 
                    type="file"
                    onChange={(e)=>field.onChange(
                      getFileFromEvent(e.target.files))
                    }
                  />
                </Button>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="logo"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Button
                  component="label"
                  role={undefined}
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ height: '53px' }}
                >
                  {(field.value as File).name || 'Select logo'}
                  <VisuallyHiddenInput 
                  type="file" 
                  onChange={(e)=>field.onChange(
                    getFileFromEvent(e.target.files))
                  }
                  />
                </Button>
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}
          >
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="inherit"
              disabled={isSubmitting} 
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default AddOrganization
