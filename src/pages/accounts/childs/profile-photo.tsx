import React, { useEffect } from 'react'
import {
  Box,
  Switch,
  Typography,
  FormControlLabel,
  Card,
  FormHelperText,
  Avatar
} from '@mui/material'
import { styled } from '@mui/system'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { uploadFile } from '../../../api/file'
import { fetchUserProfile, selectProfile } from '../../../redux/slices/user'
import { postUserUpdateProfile } from '../../../api/user'
import { useDispatch, useSelector } from 'react-redux'

const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: '50%',
  width: 150,
  height: 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  marginBottom: theme.spacing(2)
}))

const UserPhotoUpload: React.FC = () => {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile)
  const [isVerified, setIsVerified] = React.useState(true)
  const [image, setImage] = React.useState<string | null>(null)

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const { public_id } = await uploadFile(file)
      await postUserUpdateProfile({ profileImage: public_id })
      await dispatch(fetchUserProfile())
    }
  }

  useEffect(() => {
    setImage(profile?.profileImage || '')
  }, [profile])

  const handleVerificationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsVerified(event.target.checked)
  }

  return (
    <Card sx={{ p: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        marginTop={5}
        marginBottom={5}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-photo"
          type="file"
          onChange={handlePhotoUpload}
        />
        <label htmlFor="upload-photo">
          {!image && (
            <UploadBox>
              <PhotoCameraIcon color="action" />
              <Typography variant="body2">Upload photo</Typography>
            </UploadBox>
          )}
          {image && (
            <Box position="relative">
              <Avatar
                src={image}
                sx={{
                  width: '150px',
                  height: '150px',
                  border: `4px dashed grey`,
                  position: 'relative',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              />
              <PhotoCameraIcon
                color="inherit"
                sx={{
                  fontSize: '50px',
                  position: 'absolute',
                  left: '20px',
                  top: '17px',
                  backgroundColor: 'white',
                  margin: 4,
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '50%',
                  opacity: 0.3,
                  zIndex: 3
                }}
              />
            </Box>
          )}
        </label>
        <FormHelperText sx={{ mt: 3 }}>
          Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
        </FormHelperText>
      </Box>

      <Typography variant="subtitle1">Email verified</Typography>

      <Box display="flex">
        <Box flexGrow={1} sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Disabling this will automatically send the user a verification email
          </Typography>
        </Box>
        <Box flexGrow={1} sx={{ mt: 2, mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isVerified}
                onChange={handleVerificationChange}
                color="primary"
              />
            }
            label=""
          />
        </Box>
      </Box>
    </Card>
  )
}

export default UserPhotoUpload
