import React, { useState, useEffect } from "react";
import type { TodoType } from "./types";
import { saveTodos, loadTodos } from "./utils/localStorage";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { Button, Stack, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [filter, setFilter] = useState<"all" | "done" | "not-done">("all");

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: TodoType = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  // фильтрация
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.completed;
    if (filter === "not-done") return !todo.completed;
    return true; // "all"
  });

  // сортировка
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === "new") {
      return b.createdAt.getTime() - a.createdAt.getTime(); // новые сверху
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime(); // старые сверху
    }
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "new" ? "old" : "new"));
  };

  return (
    <div style={{ padding: "20px" }}>
      <AddTodo onAdd={addTodo} />

      {/* сортировка через кнопку с иконкой */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span>Сортировка:</span>
        <IconButton onClick={toggleSortOrder} color="primary">
          {sortOrder === "new" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </IconButton>
        <span>{sortOrder === "new" ? "Новые сверху" : "Старые сверху"}</span>
      </div>

      {/* фильтр через кнопки */}
      <Stack direction="row" spacing={1} sx={{ m: 1 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
        >
          Все
        </Button>
        <Button
          variant={filter === "done" ? "contained" : "outlined"}
          onClick={() => setFilter("done")}
        >
          Готовые
        </Button>
        <Button
          variant={filter === "not-done" ? "contained" : "outlined"}
          onClick={() => setFilter("not-done")}
        >
          Неготовые
        </Button>
      </Stack>

      <TodoList todos={sortedTodos} setTodos={setTodos} />
    </div>
  );
};

export default App;
