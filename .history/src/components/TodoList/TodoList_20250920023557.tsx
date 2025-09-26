import React, { useState } from "react";
import type { TodoGroup, Task } from "../../types";
import { Card, Stack, ToggleButton, ToggleButtonGroup, IconButton } from "@mui/material";
import TodoItem from "../TodoItem/TodoItem";
import AddTodo from "../AddTodo/AddTodo";

interface TodoListProps {
  group: TodoGroup;
  onUpdateGroup: (updated: TodoGroup) => void;
}

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup }) => {
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false, createdAt: new Date() };
    const updatedTasks = sortOrder === "new" ? [newTask, ...group.tasks] : [...group.tasks, newTask];
    onUpdateGroup({ ...group, tasks: updatedTasks });
  };

  const toggleTask = (id: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t)
    });
  };

  const deleteTask = (id: number) => {
    onUpdateGroup({ ...group, tasks: group.tasks.filter((t) => t.id !== id) });
  };

  const editTask = (id: number, text: string) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((t) => t.id === id ? { ...t, text } : t)
    });
  };

  const filteredTasks = group.tasks.filter(t =>
    filter === "completed" ? t.completed :
    filter === "active" ? !t.completed : true
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "new" ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <Card sx={{ p: 2, mb: 2, maxWidth: 500 }}>
      <h3>{group.title}</h3>

      <AddTodo onAdd={addTask} />

      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <ToggleButtonGroup value={filter} exclusive onChange={(_e, val) => val && setFilter(val)} size="small">
          <ToggleButton value="all">Все</ToggleButton>
          <ToggleButton value="active">Неготовые</ToggleButton>
          <ToggleButton value="completed">Готовые</ToggleButton>
        </ToggleButtonGroup>
        <IconButton onClick={() => setSortOrder(sortOrder === "new" ? "old" : "new")}>
          {sortOrder === "new" ? "⬆️" : "⬇️"}
        </IconButton>
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
    </Card>
  );
};

export default TodoList;
