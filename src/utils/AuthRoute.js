import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  return user ? (
    <Navigate
      to='/dashboard'
      replace
      state={{ from: location }}
    />
  ) : (
    children
  );
};

export default AuthRoute;
