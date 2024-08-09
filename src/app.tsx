import './global.css'
import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { NotFound } from './pages/not-found/not-found'
import { Loading } from './components/loading'
import AuthGuard from './components/auth-guard'
import { ProfilePage } from './pages/accounts/profile'
import OrganizationHome from './pages/organization'
import UsersPage from './pages/user-lists/users'
import MemebersPage from './pages/user-lists/members'
import AdminsPage from './pages/user-lists/admins'
import DataLoader from './dasboard-layout/data-loader'

const DashboardLayout = lazy(() => import('./dasboard-layout'))
const LoginPage = lazy(() => import('./pages/login/login'))
const EnrollInPerkMembership = lazy(
  () => import('./pages/enroll-perk-membership')
)
const Home = lazy(() => import('./pages/home'))

export default function App() {
  const routes = useRoutes([
    {
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
      index: true
    },
    {
      path: '/enroll/:organizationId',
      element: (
        <Suspense fallback={<Loading />}>
          <EnrollInPerkMembership />
        </Suspense>
      )
    },
    {
      path: 'app',
      element: (
        <Suspense fallback={<Loading />}>
          <AuthGuard>
            <DataLoader>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </DataLoader>
          </AuthGuard>
        </Suspense>
      ),
      children: [
        { element: <Home />, index: true },
        { path: 'profile', element: <ProfilePage /> },
        { path: '/app/add-organization', element: <OrganizationHome /> },
        { path: '/app/users', element: <UsersPage /> },
        { path: '/app/members', element: <MemebersPage /> },
        { path: '/app/admins', element: <AdminsPage /> }
      ]
    },
    {
      path: '404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ])

  return routes
}
