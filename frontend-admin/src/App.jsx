import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Forbidden from './pages/Forbidden';
import NotFound from './pages/NotFound';
import { adminRoutes } from './routes/adminRoutes';
import AppProviders from './components/common/AppProviders';

function RootProviders() {
  return (
    <AppProviders>
      <Outlet />
    </AppProviders>
  );
}

const router = createBrowserRouter([
  {
    element: <RootProviders />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/reset-password', element: <ResetPassword /> },
      { path: '/forbidden', element: <Forbidden /> },
      ...adminRoutes,
      { path: '/', element: <Navigate to="/admin" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
