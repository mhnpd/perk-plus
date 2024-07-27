import Card from '@mui/material/Card'
import ContactApp from './users'
import { useDispatch, useSelector } from 'react-redux'
import { getDefaultOrg } from '../../redux/slices/user'
import { fetchOrganizationUsers, selectUsersInOrganization } from '../../redux/slices/orgs'
import { useEffect } from 'react'

export default function UserPage() {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const OrgUsers = useSelector(selectUsersInOrganization)

  useEffect(() => {
    dispatch(fetchOrganizationUsers(defaultOrgId))
  }, [defaultOrgId, dispatch])

  return (
    <Card>
      <ContactApp />
    </Card>
  )
}
