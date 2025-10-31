import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          age: age ? Number(age) : undefined
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert("Ошибка: " + (errorData.message || "Регистрация не удалась"));
        return;
      }
  
      const data = await response.json();
      console.log("Ответ сервера:", data);
  
      localStorage.setItem("accessToken", data.accessToken);
  
      alert("Регистрация прошла успешно!");
      setEmail("");
      setPassword("");
      setAge("");
  
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      alert("Произошла ошибка при регистрации");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">Регистрация</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        helperText="Минимум 6 символов"
      />
      <TextField
        label="Возраст (опционально)"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Зарегистрироваться
      </Button>
    </Box>
  );
}
