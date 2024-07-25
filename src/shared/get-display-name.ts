import { User } from '../api/user-login'

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const getDisplayName = (user: User | null) => {
  if (user && user.firstName && user.lastName) {
    return `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}`
  }
  return ''
}
