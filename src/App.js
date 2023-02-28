import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Edit,
  Error,
  Home,
  Dashboard,
  Register,
  SharedLayout,
} from 'pages';
import { useSelector } from 'react-redux';

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route
              index
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            />
            <Route
              path='dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='register'
              element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
              }
            />
            <Route
              path='edit/:slug'
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
