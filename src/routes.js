import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import ForgotPassword from './pages/ForgotPassword';
import EnterOTP from './pages/EnterOTP';
import TwofactorOTP from './pages/TwofactorOTP';
import { Constants } from './utils/Constants';

// ----------------------------------------------------------------------

export default function Router() {
  const notAuthenticated = !(localStorage.getItem(Constants.AuthToken) || sessionStorage.getItem(Constants.AuthToken));

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          path: '/dashboard',
          element: !notAuthenticated ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />,
        },
        { path: 'app', element: !notAuthenticated ? <DashboardApp /> : <Navigate to="/login" /> },
        { path: 'user', element: !notAuthenticated ? <User /> : <Navigate to="/login" /> },
        { path: 'products', element: !notAuthenticated ? <Products /> : <Navigate to="/login" /> },
        { path: 'blog', element: !notAuthenticated ? <Blog /> : <Navigate to="/login" /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'twofactorotp', element: <TwofactorOTP /> },
        { path: 'login', element: notAuthenticated ? <Login /> : <Navigate to="/dashboard/app" /> },
        { path: 'register', element: notAuthenticated ? <Register /> : <Navigate to="/dashboard/app" /> },
        { path: 'forgotpassword', element: notAuthenticated ? <ForgotPassword /> : <Navigate to="/dashboard/app" /> },
        { path: 'enterotp', element: notAuthenticated ? <EnterOTP /> : <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
