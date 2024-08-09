import { SvgColor } from '../components/svg-color'

export interface NavigationItem {
  title: string;
  path?: string;
  icon: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
}

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const navConfig:NavigationItem[] = [
  {
    title: 'dashboard',
    path: '/app',
    icon: icon('ic_analytics')
  },
  {
    title: 'user management',
    icon: icon('ic_user'),
    children: [
      {
        title: 'Users',
        path: '/app/users'
      },
      {
        title: 'Members',
        path: '/app/members'
      },
      {
        title: 'Admins',
        path: '/app/admins',
      },
    ]
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
