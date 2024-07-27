import { FixedSizeList as List } from 'react-window'
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Box,
  Typography
} from '@mui/material'
import { User } from '../../../api/user'
import { getDisplayName } from '../../../shared/get-display-name'
import { getAvatarProps } from '../../../shared/get-avatar-props'
import { CSSProperties } from 'react'

interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
  selectedUserId: string | null
}

export const UserList = ({
  users,
  onSelect,
  selectedUserId
}: UserListProps) => {
  const Row = ({ index, style }: { index: number, style: CSSProperties }) => {
    const user = users[index]
    return (
      <div style={style}>
        <ListItemButton
          key={user.userId}
          selected={user.userId === selectedUserId}
          onClick={() => onSelect(user)}
        >
          <ListItemAvatar>
            <Avatar {...getAvatarProps(user)} />
          </ListItemAvatar>
          <ListItemText primary={getDisplayName(user)} secondary={user.role} />
        </ListItemButton>
      </div>
    )
  }

  if (!users.length) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5
        }}
      >
        <Box sx={{ mt: 5, width: 150, textAlign: 'center' }}>
          <Typography variant="body1" color="grey">
            No users found. The user list is currently empty or contains no members.
          </Typography>
        </Box>
      </Box>
    )
  }

  return (

    <List
      height={500}
      itemCount={users.length}
      itemSize={72}
      width="100%"
    >
      {Row}
    </List>
  )
}
