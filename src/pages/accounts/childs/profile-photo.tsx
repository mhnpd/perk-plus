import React from 'react'
import {
  Box,
  Switch,
  Typography,
  FormControlLabel,
  Card,
  FormHelperText,
  Avatar,
} from '@mui/material'
import { styled } from '@mui/system'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { uploadFile } from '../../../api/file'
import { selectProfile, updateUserProfile } from '../../../redux/slices/user'
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

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0]
        const { public_id } = await uploadFile(file)
        const user = await postUserUpdateProfile({ profileImage: public_id })
        dispatch(updateUserProfile(user))
      }
    } catch (error) {
      console.error(error)
    }
  }

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
          <UploadBox>
            {!profile?.profileImage && <PhotoCameraIcon color="action" />}
            {profile?.profileImage && (
              <Avatar
                src={profile?.profileImage}
                sx={{ width: 150, height: 150 }}
              />
            )}
            <Typography variant="body2">Upload photo</Typography>
          </UploadBox>
        </label>
        <FormHelperText>
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
