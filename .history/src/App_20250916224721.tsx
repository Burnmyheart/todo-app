import React, { useState, useEffect } from "react";
import type { TodoType } from "./types";
import { saveTodos, loadTodos } from "./utils/localStorage";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

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

  // 🔹 фильтрация
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.completed;
    if (filter === "not-done") return !todo.completed;
    return true; // "all"
  });

  // 🔹 сортировка
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === "new") {
      return b.createdAt.getTime() - a.createdAt.getTime(); // новые сверху
    } else {
      return a.createdAt.getTime() - b.createdAt.getTime(); // старые сверху
    }
  });

  return (
    <div style={{ padding: "20px" }}>
      <AddTodo onAdd={addTodo} />

      {/* 🔹 Сортировка */}
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={sortOrder}
          label="Сортировка"
          onChange={(e: SelectChangeEvent) =>
            setSortOrder(e.target.value as "new" | "old")
          }
        >
          <MenuItem value="new">Новые сверху</MenuItem>
          <MenuItem value="old">Старые сверху</MenuItem>
        </Select>
      </FormControl>

      {/* 🔹 Фильтрация */}
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>Фильтр</InputLabel>
        <Select
          value={filter}
          label="Фильтр"
          onChange={(e: SelectChangeEvent) =>
            setFilter(e.target.value as "all" | "done" | "not-done")
          }
        >
          <MenuItem value="all">Все</MenuItem>
          <MenuItem value="done">Готовые</MenuItem>
          <MenuItem value="not-done">Неготовые</MenuItem>
        </Select>
      </FormControl>

      <TodoList todos={sortedTodos} setTodos={setTodos} />
    </div>
  );
};

export default App;
