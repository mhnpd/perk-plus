import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationUsers, selectOrganizationMembers } from '../../redux/slices/orgs'
import { getDefaultOrg } from '../../redux/slices/user'
import UsersCard from './childs/user-card'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'

const Members = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const users = useSelector(selectOrganizationMembers)

  useEffect(() => {
    dispatch(fetchOrganizationUsers(defaultOrgId))
  }, [defaultOrgId])

  return (
    <>
      <Helmet>
        <title>{`Members | ${AppConfig.AppName}`}</title>
      </Helmet>
      <UsersCard users={users} title="Member" />
    </>
  )
}

export default Members
