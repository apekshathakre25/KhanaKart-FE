import { Navigate, Outlet } from 'react-router-dom';
import { useAppData } from '../context/AppContext';

const PublicRoute = () => {
  const { loading, auth } = useAppData();

  if (loading) return null;

  return auth ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
