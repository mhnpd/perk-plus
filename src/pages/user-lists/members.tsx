import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrganizationMembers,
  selectOrganizationMembers
} from '../../redux/slices/orgs'
import { getDefaultOrg } from '../../redux/slices/user'
import UsersCard from './childs/user-card'
import { Helmet } from 'react-helmet-async'
import { AppConfig } from '../../constants/config'
import { addOrganizationMember, removeOrganizationMember } from '../../api/orgs'

const Members = () => {
  const dispatch = useDispatch()
  const defaultOrgId = useSelector(getDefaultOrg)
  const users = useSelector(selectOrganizationMembers)

  useEffect(() => {
    dispatch(fetchOrganizationMembers(defaultOrgId))
  }, [defaultOrgId])

  const handleInvite = async (email: string) => {
    const response = await addOrganizationMember(defaultOrgId!, email)
    await dispatch(fetchOrganizationMembers(defaultOrgId))
    return response
  }

  const handleRemove = async (userId: string) => {
    const response = await removeOrganizationMember(defaultOrgId!, userId)
    await dispatch(fetchOrganizationMembers(defaultOrgId))
    return response
  }
  return (
    <>
      <Helmet>
        <title>{`Members | ${AppConfig.AppName}`}</title>
      </Helmet>
      <UsersCard
        users={users}
        title="Members"
        showInviteButton
        showRemoveUserButton
        onInvite={handleInvite}
        onRemove={handleRemove}
      />
    </>
  )
}

export default Members
