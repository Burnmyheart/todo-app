import React from "react";
import type { TodoGroup, Task } from "../../types";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";
import { Card, Stack, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface TodoListProps {
  group: TodoGroup;
  onUpdateGroup: (updated: TodoGroup) => void;
  onMoveGroup: (id: number, direction: "up" | "down") => void; // ✅ добавили сюда
}

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup, onMoveGroup }) => {
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    onUpdateGroup({ ...group, tasks: [...group.tasks, newTask] });
  };

  const toggleTask = (taskId: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    });
  };

  const deleteTask = (taskId: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.filter((task) => task.id !== taskId),
    });
  };

  const editTask = (taskId: number, newText: string) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      ),
    });
  };

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h3>{group.title}</h3>
        <div>
          <IconButton onClick={() => onMoveGroup(group.id, "up")} size="small">
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton onClick={() => onMoveGroup(group.id, "down")} size="small">
            <ArrowDownwardIcon />
          </IconButton>
        </div>
      </Stack>

      <AddTodo onAdd={addTask} placeholder="Новая задача..." />

      <Stack spacing={1}>
        {group.tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
            onEdit={(newText) => editTask(task.id, newText)}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default TodoList;
