import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { saveGroups, loadGroups } from "./utils/localStorage";
import type { TodoGroup } from "./types";

import { ThemeProvider, CssBaseline, Paper, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Menu from "./components/menu/Menu";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : false;
  });

  useEffect(() => {
    setGroups(loadGroups());
  }, []);

  useEffect(() => {
    saveGroups(groups);
  }, [groups]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const addGroup = (title: string) => {
    const newGroup: TodoGroup = {
      id: Date.now(),
      title,
      tasks: [],
      createdAt: new Date(),
    };
    setGroups((prev) => [...prev, newGroup]);
  };

  const updateGroup = (updated: TodoGroup) => {
    setGroups((prev) =>
      prev.map((group) => (group.id === updated.id ? updated : group))
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <h1>Todo</h1>
          <AddTodo onAdd={addGroup} placeholder="Новая группа..." />
          {groups.map((group) => (
            <TodoList
              key={group.id}
              group={group}
              onUpdateGroup={updateGroup}
            />
          ))}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
