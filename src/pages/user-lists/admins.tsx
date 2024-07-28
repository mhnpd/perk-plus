import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrganizationAdmins, selectOrganizationAdmins } from '../../redux/slices/orgs'
import { getDefaultOrg } from '../../redux/slices/user'
import UsersCard from './childs/user-card'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'

const Admins = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const users = useSelector(selectOrganizationAdmins)

  useEffect(() => {
    dispatch(fetchOrganizationAdmins(defaultOrgId))
  }, [defaultOrgId])

  return (
    <>
      <Helmet>
        <title>{`Admins | ${AppConfig.AppName}`}</title>
      </Helmet>
      <UsersCard users={users} title="Admins" />
    </>
  )
}

export default Admins
