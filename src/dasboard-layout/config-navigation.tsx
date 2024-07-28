import { SvgColor } from '../components/svg-color'

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const navConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics')
  },
  {
    title: 'user',
    path: '/app/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Members',
    path: '/app/members',
    icon: icon('ic_user'),
  },
  {
    title: 'Admins',
    path: '/app/admins',
    icon: icon('ic_user'),
  },
]

export default navConfig
