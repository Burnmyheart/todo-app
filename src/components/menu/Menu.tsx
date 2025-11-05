import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { logoutUser } from '../../slices/authSlice';

interface MenuProps {
  darkMode: boolean;
  onToggle: () => void;
}

function DenseAppBar({ darkMode, onToggle }: MenuProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Switch checked={darkMode} onChange={onToggle} color="default" />

        <Stack direction="row" spacing={1} sx={{ flexGrow: 1, justifyContent: 'center' }}>
          <Button component={RouterLink} to="/" color="inherit">
            Задачи
          </Button>
          {token ? (
            <>
              <Button component={RouterLink} to="/profile" color="inherit">
                Профиль
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Войти
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                Регистрация
              </Button>
            </>
          )}
        </Stack>

        <div />
      </Toolbar>
    </AppBar>
  );
}

export default DenseAppBar;
