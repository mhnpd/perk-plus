import {
  Box,
  Avatar,
  Typography,
  Divider
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { Organization } from '../../../api/orgs'


interface OrgDetailsProps {
  org: Organization
}

export const OrgDetails = ({ org }: OrgDetailsProps) => (
  <>
    <Box sx={{ ml: 4, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 5 }}>
        <Avatar
          // TODO: Change this to user.profileImage
          src='https://modernize-nextjs.adminmart.com/images/profile/user-3.jpg'
          sx={{ width: 90, height: 90 }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h6">{org?.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {org?.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {org?.name ?? 'Company name not available'}
          </Typography>
        </Box>
      </Box>
      <Grid container justifyContent='space-between' spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Phone Number
          </Typography>
          <Typography variant="body1">{org.phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Email Address
          </Typography>
          <Typography variant="body1">{org.email}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Address
        </Typography>
        <Typography variant="body1" color={org.email ?? 'GrayText'} >
          {org?.banner ?? 'Not available'}
        </Typography>
      </Box>
      <Grid container justifyContent='space-between' sx={{ mt: 2, pb: 5 }} spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Department
          </Typography>
          <Typography variant="body1" color={org?.banner ?? 'GrayText'}>
            {org?.banner ?? 'Not available'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Company
          </Typography>
          <Typography variant="body1" color={org?.banner ?? 'GrayText'}>
            {org?.banner ?? 'Not available'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider />
  </>
)

