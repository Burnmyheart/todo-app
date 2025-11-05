import { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/menu/Menu';
import TodoList from './components/TodoList/TodoList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import ProfilePage from './components/Profile/ProfilePage';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Menu darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />

        <Container maxWidth="sm" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <TodoList />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Paper>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}
