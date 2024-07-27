import React from 'react'
import Container from '@mui/material/Container'
import OrganizationTable from './childs/org-table'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Iconify } from '../../components/iconify'
import Button from '@mui/material/Button'
import AddOrganization from './childs/add-organization'
import Collapse from '@mui/material/Collapse'

export default function OrgHome(): React.ReactElement {
  const [showAddOrgModal, setShowAddOrgModal] = React.useState(false)
  return (
    <Container>
      <Helmet>
        <title>{`Organization Home | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Organizations</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={
            <Iconify
              icon={showAddOrgModal ? 'eva:eye-off-2-fill' : 'eva:plus-fill'}
            />
          }
          onClick={() => setShowAddOrgModal(!showAddOrgModal)}
        >
          {showAddOrgModal ? 'Hide' : 'Add new organization'}
        </Button>
      </Stack>
      <Collapse in={showAddOrgModal} timeout={500}>
        <AddOrganization />
      </Collapse>
      <OrganizationTable />
    </Container>
  )
}
