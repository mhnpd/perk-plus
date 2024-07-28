import { useEffect, useState } from 'react'
import { Box, Typography, Divider, TextField, Card, Grid } from '@mui/material'
import { User } from '../../../api/user'
import { getDisplayName } from '../../../shared/get-display-name'
import { debounce, noop } from 'lodash'
import { UserDetails } from './user-details'
import { UserList } from './user-list'
import { InviteUser } from './invite-user'

interface UsersProps {
  users: User[]
  showInviteButton?: boolean
  onInvite?: (email: string) => void
  title: string
}
const UsersCard = ({ users, title, showInviteButton, onInvite }: UsersProps) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    setSelectedUser(users[0])
    setFilteredUsers([...users])
    setFilteredUsers(users)
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
      <Box sx={{ display: 'flex', height: '70vh' }}>
        <Box sx={{ overflow: 'auto' }}>
          <TextField
            placeholder={`Search ${title}`}
            size="small"
            variant="outlined"
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{ margin: 3, width: 300 }}
          />
          <UserList
            users={[...filteredUsers]}
            selectedUserId={selectedUser?.userId ?? null}
            onSelect={setSelectedUser}
          />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ flex: 1 }}>
          <Grid container sx={{ margin: 3.6 }}>
            <Grid item xs={3}>
              <Typography variant="h5">{`${title} details`}</Typography>
            </Grid>
            {showInviteButton && (
              <Grid xs={8} item>
                <Box display="flex" justifyContent="flex-end">
                  <InviteUser
                    buttonTitle={`Invite ${title}`}
                    onInvite={onInvite ?? noop}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
          <Divider />
          {<UserDetails user={selectedUser} />}
        </Box>
      </Box>
    </Card>
  )
}

export default UsersCard
