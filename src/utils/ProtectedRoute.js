import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;