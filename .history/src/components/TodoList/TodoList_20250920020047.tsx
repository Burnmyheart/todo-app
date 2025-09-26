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
  onMoveGroup: (id: number, direction: "up" | "down") => void;
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

  const moveTask = (taskId: number, direction: "up" | "down") => {
    const index = group.tasks.findIndex((t) => t.id === taskId);
    if (index < 0) return;

    const newTasks = [...group.tasks];
    if (direction === "up" && index > 0) {
      [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
    }
    if (direction === "down" && index < newTasks.length - 1) {
      [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
    }

    onUpdateGroup({ ...group, tasks: newTasks });
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
        {group.tasks.map((task, index) => (
          <Stack
            key={task.id}
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <TodoItem
              task={task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
              onEdit={(newText) => editTask(task.id, newText)}
            />
            <div>
              <IconButton
                onClick={() => moveTask(task.id, "up")}
                size="small"
                disabled={index === 0}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() => moveTask(task.id, "down")}
                size="small"
                disabled={index === group.tasks.length - 1}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default TodoList;
