import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import DarkMode from 'components/DarkMode';

const SharedLayout = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      {user && <Navbar />}
      <ToastContainer />
      <DarkMode />
      <Outlet />
    </>
  );
};

export default SharedLayout;
