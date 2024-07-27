import { User } from '../api/user'

// Function to generate a gradient color based on a string (user's name or ID)
const stringToGradient = (string: string) => {
  let hash = 0
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color1 = '#'
  let color2 = '#'

  for (let i = 0; i < 3; i += 1) {
    const value1 = (hash >> (i * 8)) & 0xff
    const value2 = (hash >> ((i + 3) * 8)) & 0xff
    color1 += `00${value1.toString(16)}`.slice(-2)
    color2 += `00${value2.toString(16)}`.slice(-2)
  }

  return `linear-gradient(135deg, ${color1}, ${color2})`
}

export const getAvatarProps = (user: User) => {
  if (user?.profileImage) {
    return { src: user?.profileImage }
  }

  const initials = `${user.firstName[0]}${user.lastName[0]}`
  const fullName = `${user.firstName} ${user.lastName}`
  return {
    sx: {
      background: stringToGradient(fullName),
      color: '#fff',
    },
    children: initials,
  }
}


