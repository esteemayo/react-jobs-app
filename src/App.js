import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Edit, Error, Home, Dashboard, Register } from 'pages';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' >
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='register' element={<Register />} />
          <Route path='edit/:slug' element={<Edit />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
