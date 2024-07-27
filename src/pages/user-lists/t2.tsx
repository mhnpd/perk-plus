// @ts-nocheck // to avoid type checking errors
import React, { useState } from 'react'
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Typography, Divider, Button, TextField } from '@mui/material'
import { Star, StarBorder, Delete, Edit } from '@mui/icons-material'

const users = [
  {
    id: 1,
    name: 'Georgeanna Ramero',
    role: 'Sales',
    phone: '555-1234',
    email: 'georgeanna@example.com',
    address: '123 Main St, Anytown, USA',
    department: 'Sales',
    company: 'Example Corp',
    notes: 'Sample note for Georgeanna Ramero.',
    icon: '/path-to-icon1.png' // replace with the correct path
  },
  ...Array(50).fill(50).map(id => ({
    id: id,
    name: 'Cami Macha',
    role: 'Support',
    phone: '999-895-9652',
    email: 'camisad@claimab.com',
    address: '76 Hamilton Ave, Yonkers, NY, 10705',
    department: 'Support',
    company: 'Zboncak LLC',
    notes: 'Sample note for Cami Macha.',
    icon: '/path-to-icon2.png' // replace with the correct path
  }))
  // Add more users as needed
]

const UserList = ({ users, onSelect, selectedUserId }) => (
  <List>
    {users.map(user => (
      <ListItem key={user.id} button selected={user.id === selectedUserId} onClick={() => onSelect(user)}>
        <ListItemAvatar>
          <Avatar src={user.icon} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.role} />
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

const UserDetails = ({ user }) => (
  <Box sx={{ padding: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
      <Avatar src={user.icon} sx={{ width: 56, height: 56 }} />
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="textSecondary">{user.role}</Typography>
        <Typography variant="body2" color="textSecondary">{user.company}</Typography>
      </Box>
    </Box>
    <Divider />
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Phone Number</Typography>
      <Typography variant="body1">{user.phone}</Typography>
    </Box>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Email Address</Typography>
      <Typography variant="body1">{user.email}</Typography>
    </Box>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Address</Typography>
      <Typography variant="body1">{user.address}</Typography>
    </Box>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Department</Typography>
      <Typography variant="body1">{user.department}</Typography>
    </Box>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Company</Typography>
      <Typography variant="body1">{user.company}</Typography>
    </Box>
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" color="textSecondary">Notes</Typography>
      <Typography variant="body1">{user.notes}</Typography>
    </Box>
    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
      <Button variant="contained" color="primary" startIcon={<Edit />}>Edit</Button>
      <Button variant="contained" color="secondary" startIcon={<Delete />}>Delete</Button>
    </Box>
  </Box>
)

const ContactApp = () => {
  const [selectedUser, setSelectedUser] = useState(users[0])

  return (
    <Box sx={{ display: 'flex', height: '80vh' }}>
      <Box sx={{ width: '350px', borderRight: '1px solid #ddd', overflowY: 'auto' }}>
        <TextField placeholder="Search Contacts" size='small' variant="outlined" sx={{ margin: 2 }} />
        <UserList users={users} selectedUserId={selectedUser.id} onSelect={setSelectedUser} />
      </Box>
      <Box sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h5">Contact Details</Typography>
        <Divider />
        {selectedUser && <UserDetails user={selectedUser} />}
      </Box>
    </Box>
  )
}

export default ContactApp
