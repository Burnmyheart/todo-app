import { Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, changePassword } from "../../slices/authSlice";
import type { RootState, AppDispatch } from "../../store";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    dispatch(changePassword({ oldPassword, newPassword }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h5">Профиль</Typography>

      {status === "loading" && <Typography>Загрузка...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {user && (
        <>
          <Typography>Email: {user.email}</Typography>
          <Typography>Возраст: {user.age ?? "не указан"}</Typography>
          <Typography>
            Дата регистрации:{" "}
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
          </Typography>
        </>
      )}

      <Box
        component="form"
        onSubmit={handleChangePassword}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Старый пароль"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="Новый пароль"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Подтверждение пароля"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Обновить пароль
        </Button>
      </Box>
    </Box>
  );
}
