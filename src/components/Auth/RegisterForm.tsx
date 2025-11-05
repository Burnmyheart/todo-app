import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '../../store';
import { registerUser } from '../../slices/authSlice';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [ageError, setAgeError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const trimmedPassword = password.trim();
    const normalizedAge = age.trim();
    const parsedAge = normalizedAge === '' ? undefined : Number(normalizedAge);

    if (trimmedPassword.length < 6) {
      setPasswordError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (parsedAge !== undefined && (Number.isNaN(parsedAge) || parsedAge < 1 || parsedAge > 100)) {
      setAgeError('Возраст должен быть в диапазоне от 1 до 100 лет');
      return;
    }

    setPasswordError(null);
    setAgeError(null);

    try {
      await dispatch(registerUser({ email, password: trimmedPassword, age: parsedAge })).unwrap();
      setEmail('');
      setPassword('');
      setAge('');
      setPasswordError(null);
      setAgeError(null);
      setSubmitError(null);
      navigate('/');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setSubmitError(typeof err === 'string' ? err : 'Произошла ошибка при регистрации');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5">Регистрация</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (submitError) setSubmitError(null);
        }}
        required
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (passwordError) setPasswordError(null);
          if (submitError) setSubmitError(null);
        }}
        required
        error={Boolean(passwordError)}
        helperText={passwordError ?? 'Минимум 6 символов'}
      />
      <TextField
        label="Возраст (опционально)"
        type="number"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
          if (ageError) setAgeError(null);
          if (submitError) setSubmitError(null);
        }}
        slotProps={{ htmlInput: { min: 0, max: 120 } }}
        error={Boolean(ageError)}
        helperText={ageError ?? ''}
      />
      {submitError && (
        <Typography color="error" variant="body2">
          {submitError}
        </Typography>
      )}
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
    </Box>
  );
}
