import { useState, useEffect } from "react";
import { CssBaseline, Container, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "./components/menu/Menu";
import TodoList from "./components/TodoList/TodoList";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu darkMode={darkMode} onToggle={() => setDarkMode(prev => !prev)} />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <h1>Todo</h1>
          <TodoList />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
