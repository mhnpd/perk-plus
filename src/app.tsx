import './global.css'
import { Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import DashboardLayout from './dasboard-layout'
import LoginPage from './pages/login/login'

const IndexPage = () => {
  return <h1>Dashboard</h1>
}

export default function App() {
  const routes = useRoutes([
    {
      element: <LoginPage />,
      index: true,
    },
    {
      path: 'app',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        // { path: 'user', element: <UserPage /> },
        // { path: 'products', element: <ProductsPage /> },
        // { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ])

  return routes
}



