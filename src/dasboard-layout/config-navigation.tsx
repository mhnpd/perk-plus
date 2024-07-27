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
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart')
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog')
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock')
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled')
  }
]

export default navConfig
