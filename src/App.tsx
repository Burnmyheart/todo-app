import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoItem from "./components/TodoItem/TodoItem";
import { CssBaseline, Container, Paper, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "./components/menu/Menu";
import type { Task } from "./types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TASKS_KEY = "tasks";

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const loadTasks = (): Task[] => {
  const raw = localStorage.getItem(TASKS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw).map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      completed: !!t.completed,
    }));
    return parsed;
  } catch {
    return [];
  }
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks());
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? stored === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false, createdAt: new Date() };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const editTask = (id: number, text: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((t) =>
    filter === "completed" ? t.completed : filter === "active" ? !t.completed : true
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "new" ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <h1>Todo</h1>
          <AddTodo onAdd={addTask} placeholder="Новая задача..." />

          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(_e, val) => val && setFilter(val)}
              size="small"
            >
              <ToggleButton value="all">Все</ToggleButton>
              <ToggleButton value="active">Неготовые</ToggleButton>
              <ToggleButton value="completed">Готовые</ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={sortOrder}
              exclusive
              onChange={(_e, val) => val && setSortOrder(val)}
              size="small"
            >
              <ToggleButton value="new" aria-label="Сортировать по новым">
                <ArrowDownwardIcon />
              </ToggleButton>
              <ToggleButton value="old" aria-label="Сортировать по старым">
                <ArrowUpwardIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {sortedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}

          {sortedTasks.length === 0 && <p>Нет задач</p>}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
