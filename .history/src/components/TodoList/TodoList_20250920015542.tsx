import React, { useState } from "react";
import type { TodoGroup, TodoTask } from "../../types";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface TodoListProps {
  group: TodoGroup;
  onUpdateGroup: (group: TodoGroup) => void;
  onMoveGroup: (id: number, dir: "up" | "down") => void;
}

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup, onMoveGroup }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    if (!taskTitle.trim()) return;
    const newTask: TodoTask = { id: Date.now(), title: taskTitle };
    onUpdateGroup({ ...group, tasks: [...group.tasks, newTask] });
    setTaskTitle("");
  };

  const deleteTask = (id: number) => {
    onUpdateGroup({ ...group, tasks: group.tasks.filter((t) => t.id !== id) });
  };

  const moveTask = (id: number, dir: "up" | "down") => {
    const idx = group.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return;

    const newTasks = [...group.tasks];
    if (dir === "up" && idx > 0) {
      [newTasks[idx - 1], newTasks[idx]] = [newTasks[idx], newTasks[idx - 1]];
    }
    if (dir === "down" && idx < newTasks.length - 1) {
      [newTasks[idx + 1], newTasks[idx]] = [newTasks[idx], newTasks[idx + 1]];
    }
    onUpdateGroup({ ...group, tasks: newTasks });
  };

  const startEdit = (task: TodoTask) => {
    setEditingId(task.id);
    setEditValue(task.title);
  };

  const saveEdit = (id: number) => {
    onUpdateGroup({
      ...group,
      tasks: group.tasks.map((t) =>
        t.id === id ? { ...t, title: editValue } : t
      ),
    });
    setEditingId(null);
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{group.title}</Typography>
          <Stack direction="row">
            <IconButton onClick={() => onMoveGroup(group.id, "up")}>
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton onClick={() => onMoveGroup(group.id, "down")}>
              <ArrowDownwardIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack spacing={1}>
          {group.tasks.map((task) => (
            <Stack
              key={task.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {editingId === task.id ? (
                <>
                  <TextField
                    size="small"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <IconButton onClick={() => saveEdit(task.id)}>
                    <CheckIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography>{task.title}</Typography>
                  <Stack direction="row">
                    <IconButton onClick={() => startEdit(task)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => moveTask(task.id, "up")}>
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton onClick={() => moveTask(task.id, "down")}>
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTask(task.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </>
              )}
            </Stack>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} mt={2}>
          <TextField
            fullWidth
            size="small"
            label="Новая задача"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <IconButton color="primary" onClick={addTask}>
            <AddIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TodoList;
