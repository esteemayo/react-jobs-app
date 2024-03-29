import styled, { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import { darkTheme, lightTheme } from 'utils/Theme';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Edit,
  Error,
  Home,
  Dashboard,
  Register,
  SharedLayout,
} from 'pages';

function App() {
  const { darkMode } = useSelector((state) => state.darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Container>
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
        </Container>
      </Router>
    </ThemeProvider>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

export default App;
