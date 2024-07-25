import { User } from "../api/user-login"

export const getDisplayName = (user: User | null) => {
  console.log(user)
  if (user) {
    return `${user.firstName} ${user.lastName}`
  }
  return ''
}