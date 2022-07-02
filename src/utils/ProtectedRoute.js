import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  return !user ? <LoadingToRedirect /> : children;
};

export default ProtectedRoute;
