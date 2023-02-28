import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && <Navbar />}
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default SharedLayout;
