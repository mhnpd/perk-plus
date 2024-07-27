import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Divider,
  TextField,
  Card
} from '@mui/material'
import { User } from '../../api/user'
import { useSelector } from 'react-redux'
import { selectUsersInOrganization } from '../../redux/slices/orgs'
import { getDisplayName } from '../../shared/get-display-name'
import { debounce } from 'lodash'
import { UserDetails } from './childs/user-details'
import { UserList } from './childs/user-list'
import { AppConfig } from '../../constants/config'
import { Helmet } from 'react-helmet-async'


const Users = () => {
  const users = useSelector(selectUsersInOrganization)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0])
      setFilteredUsers(users)
    }
  }, [users])

  const handleSearchChange = debounce((text: string) => {
    if (text === '') {
      setFilteredUsers(users)
    } else {
      const filtered = users.filter((user) => {
        const fullName = getDisplayName(user).toLowerCase()
        const email = user.email.toLowerCase()
        const phone = user.phone ?? ''
        const searchLower = text.toLowerCase()

        return (
          fullName.includes(searchLower) ||
          email.includes(searchLower) ||
          phone.includes(searchLower)
        )
      })
      setFilteredUsers(filtered)
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
            placeholder="Search Contacts"
            size="small"
            variant="outlined"
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ margin: 3, width: 300 }}
          />
          <UserList
            users={filteredUsers}
            selectedUserId={selectedUser?.userId ?? null}
            onSelect={setSelectedUser}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1, }}>
          <Typography variant="h5" sx={{ margin: 3.6 }}>Contact Details</Typography>
          <Divider />
          {selectedUser && <UserDetails user={selectedUser} />}
        </Box>
      </Box>
    </Card>
  )
}

export default Users
