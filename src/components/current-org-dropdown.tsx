import React, { useEffect } from 'react'
import { Menu, MenuItem, Typography, Button } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsersOrganization } from '../redux/slices/orgs'
import { Organization } from '../api/orgs'
import { getDefaultOrg, setDefaultOrganizationId } from '../redux/slices/user'

const Organizations = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [defaultOrg, setDefaultOrg] = React.useState<Organization | null>(null)

  const organizationList = useSelector(selectUsersOrganization)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  useEffect(() => {
    const org = organizationList.find(
      (org) => org.organizationId === defaultOrgId
    )
    if (org) return setDefaultOrg(org)
  }, [defaultOrgId, organizationList])

  const handleOrgChange = (data: Organization) => {
    setDefaultOrg(data)
    dispatch(setDefaultOrganizationId(data.organizationId))
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="team-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="text"
        sx={{ color: 'black' }}
        endIcon={<ArrowDropDown />}
      >
        <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
          {defaultOrg ? defaultOrg?.name : 'Select Organization'}
        </Typography>
      </Button>
      <Menu
        id="team-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {organizationList.map((org) => (
          <MenuItem
            onClick={() => handleOrgChange(org)}
            key={org.organizationId}
          >
            <Typography variant="body2" color="gray">
              {org.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default Organizations
