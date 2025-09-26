import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";
import type { TodoGroup, Task } from "../../types";

interface TodoListProps {
  group: TodoGroup;
  onUpdateGroup: (updated: TodoGroup) => void;
}

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup }) => {
  const [sortAsc, setSortAsc] = useState(true);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    onUpdateGroup({
      ...group,
      tasks: [...group.tasks, newTask],
    });
  };

  const toggleTask = (taskId: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  const deleteTask = (taskId: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.filter((t) => t.id !== taskId),
    });
  };

  const editTask = (taskId: number, newText: string) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((t) =>
        t.id === taskId ? { ...t, text: newText } : t
      ),
    });
  };

  const sortedTasks = [...group.tasks].sort((a, b) =>
    sortAsc
      ? +new Date(a.createdAt) - +new Date(b.createdAt)
      : +new Date(b.createdAt) - +new Date(a.createdAt)
  );

  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{group.title}</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => setSortAsc(true)} color="primary">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton onClick={() => setSortAsc(false)} color="primary">
              <ArrowDownwardIcon />
            </IconButton>
          </Stack>
        </Stack>

        <AddTodo placeholder="Новая задача..." onAdd={addTask} />

        <Stack spacing={1} sx={{ mt: 2 }}>
          {sortedTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={(newText) => editTask(task.id, newText)}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TodoList;
