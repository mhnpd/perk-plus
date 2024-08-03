import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  TextField,
  Card,
  Grid,
  Button,
  Collapse
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsersOrganization } from '../../redux/slices/orgs'
import { debounce } from 'lodash'
import { OrgDetails } from './childs/org-details'
import { OrgList } from './childs/org-list'
import { AppConfig } from '../../constants/config'
import { Helmet } from 'react-helmet-async'
import { getDefaultOrg } from '../../redux/slices/user'
import { Organization } from '../../api/orgs'
import { Iconify } from '../../components/iconify'
import AddOrganization from './childs/add-organization'

const Organizations = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const orgList = useSelector(selectUsersOrganization)

  const [filteredOrgs, setFilteredOrgs] = useState<Organization[]>([])
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)
  const [showAddOrgModal, setShowAddOrgModal] = useState(false)

  useEffect(() => {
    setSelectedOrg(
      orgList.find((org) => org.organizationId === defaultOrgId) || null
    )
    setFilteredOrgs(orgList)
  }, [orgList, dispatch])

  const handleSearchChange = debounce((text: string) => {
    if (text === '') {
      setFilteredOrgs(orgList)
    } else {
      const filtered = orgList.filter((org) => {
        const fullName = org.name.toLowerCase()
        const email = org.email ?? ''
        const phone = org?.phone ?? ''
        const searchLower = text.toLowerCase()

        return (
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower)
        )
      })
      setFilteredOrgs(filtered)
    }
  }, 300)

  return (
    <Card>
      <Helmet>
        <title>{`Users | ${AppConfig.AppName}`}</title>
      </Helmet>
      <Box sx={{ display: 'flex', height: '70vh' }}>
        <Box sx={{ overflow: 'auto' }}>
          <TextField
            placeholder="Search Organizations"
            size="small"
            variant="outlined"
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ margin: 3, width: 300 }}
          />
          <OrgList
            orgs={[...filteredOrgs]}
            selectedOrgId={selectedOrg?.organizationId ?? null}
            onSelect={setSelectedOrg}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1 }}>
          <Grid container sx={{ margin: 3.6 }}>
            <Grid item xs={3}>
              <Typography variant="h5">
                {showAddOrgModal ? 'Add Organization' : 'Organization Details'}
              </Typography>
            </Grid>
            <Grid xs={8} item>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={
                    <Iconify
                      icon={
                        showAddOrgModal ? 'eva:eye-off-2-fill' : 'eva:plus-fill'
                      }
                    />
                  }
                  onClick={() => setShowAddOrgModal(!showAddOrgModal)}
                >
                  {showAddOrgModal ? 'Hide' : 'Add new organization'}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Collapse
            in={showAddOrgModal}
            timeout={200}
            unmountOnExit
          >
            <AddOrganization />
          </Collapse>
          <Collapse
            in={!showAddOrgModal && !!selectedOrg}
            timeout={200}
            unmountOnExit
          >
            <OrgDetails org={selectedOrg as Organization} />
          </Collapse>
        </Box>
      </Box>
    </Card>
  )
}

export default Organizations
