import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationUsers, selectUsersInOrganization } from '../../redux/slices/orgs'
import { getDefaultOrg } from '../../redux/slices/user'
import UsersCard from './childs/user-card'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'

const Users = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const users = useSelector(selectUsersInOrganization)

  useEffect(() => {
    dispatch(fetchOrganizationUsers(defaultOrgId))
  }, [defaultOrgId])

  return (
    <>
      <Helmet>
        <title>{`Users | ${AppConfig.AppName}`}</title>
      </Helmet>
      <UsersCard
        users={users}
        title="Users"
        showInviteButton={false}
      />
    </>
  )
}

export default Users
