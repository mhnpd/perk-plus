import { useEffect, useState } from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { StarBorder, Delete } from '@mui/icons-material'
import { User } from '../../api/user'
import { useSelector } from 'react-redux'
import { selectUsersInOrganization } from '../../redux/slices/orgs'
import { getDisplayName } from '../../shared/get-display-name'
import { getAvatarProps } from '../../shared/get-avatar-props'
import { debounce } from 'lodash'



const UserList = ({ users, onSelect, selectedUserId }) => (
  <List>
    {users.map((user) => (
      <ListItem
        key={user.id}
        button
        selected={user.userId === selectedUserId}
        onClick={() => onSelect(user)}
      >
        <ListItemAvatar>
          <Avatar {...getAvatarProps(user)} />
        </ListItemAvatar>
        <ListItemText primary={getDisplayName(user)} secondary={user.role} />
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <StarBorder />
          </IconButton>
          <IconButton edge="end">
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
)

interface UserDetailsProps {
  user: User
}

const UserDetails = ({ user }: UserDetailsProps) => (
  <>
    <Box sx={{ ml: 4, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 5 }}>
        <Avatar
          src='https://modernize-nextjs.adminmart.com/images/profile/user-3.jpg'
          sx={{ width: 90, height: 90 }}
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="h6">{getDisplayName(user)}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.role}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.profileImage ?? 'Company name not available'}
          </Typography>
        </Box>
      </Box>
      <Grid container justifyContent='space-between' spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Phone Number
          </Typography>
          <Typography variant="body1">{user.phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Email Address
          </Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Address
        </Typography>
        <Typography variant="body1" color={user.profileImage ?? 'GrayText'} >
          {user.profileImage ?? 'Not available'}
        </Typography>
      </Box>
      <Grid container justifyContent='space-between' sx={{ mt: 2, pb: 5 }} spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Department
          </Typography>
          <Typography variant="body1" color={user.profileImage ?? 'GrayText'}>
            {user.profileImage ?? 'Not available'}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">
            Company
          </Typography>
          <Typography variant="body1" color={user.profileImage ?? 'GrayText'}>
            {user.profileImage ?? 'Not available'}
          </Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider />
  </>
)

const ContactApp = () => {
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
          selectedUserId={selectedUser?.userId}
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
  )
}

export default ContactApp
