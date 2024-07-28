import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrganizationAdmins,
  selectOrganizationAdmins
} from '../../redux/slices/orgs'
import { getDefaultOrg } from '../../redux/slices/user'
import UsersCard from './childs/user-card'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import { addOrganizationAdmin, removeOrganizationAdmin } from '../../api/orgs'

const Admins = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const users = useSelector(selectOrganizationAdmins)

  useEffect(() => {
    dispatch(fetchOrganizationAdmins(defaultOrgId))
  }, [defaultOrgId])

  const handleInvite = async (email: string) => {
    const r = await addOrganizationAdmin(defaultOrgId!, email)
    await dispatch(fetchOrganizationAdmins(defaultOrgId))
    return r
  }

  const handleAdminRemove = async (userId: string) => {
    const response = await removeOrganizationAdmin(defaultOrgId!, userId)
    await dispatch(fetchOrganizationAdmins(defaultOrgId))
    return response
  }

  return (
    <>
      <Helmet>
        <title>{`Admins | ${AppConfig.AppName}`}</title>
      </Helmet>
      <UsersCard
        users={users}
        title="Admins"
        showInviteButton
        showRemoveUserButton
        onInvite={handleInvite}
        onRemove={handleAdminRemove}
      />
    </>
  )
}

export default Admins
