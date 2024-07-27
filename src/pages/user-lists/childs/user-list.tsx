import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton
} from '@mui/material'
import { User } from '../../../api/user'
import { getDisplayName } from '../../../shared/get-display-name'
import { getAvatarProps } from '../../../shared/get-avatar-props'

interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
  selectedUserId: string | null
}
export const UserList = ({
  users,
  onSelect,
  selectedUserId
}: UserListProps) => (
  <List>
    {users.map((user) => (
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
    ))}
  </List>
)
