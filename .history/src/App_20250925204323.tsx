import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { saveGroups, loadGroups } from "./utils/localStorage";
import type { TodoGroup } from "./types";

import { ThemeProvider, CssBaseline, Button, Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [darkMode, setDarkMode] = useState(false);

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
    <div style={{ padding: "20px", maxWidth: "100%", margin: "0 auto" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: darkMode ? "background.default" : "#fff",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{ mb: 2 }}
          >
            {darkMode ? "Светло" : "Темно"}
          </Button>

          <h1>Todo</h1>
          <AddTodo onAdd={addGroup} />
          {groups.map((group) => (
            <TodoList
              key={group.id}
              group={group}
              onUpdateGroup={updateGroup}
            />
          ))}
        </Paper>
      </ThemeProvider>
    </div>
  );
};

export default App;
