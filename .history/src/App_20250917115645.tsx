import React, { useState } from "react";
import type { TodoGroup, Task } from "./types";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [newGroup, setNewGroup] = useState("");

  // Добавить группу
  const handleAddGroup = () => {
    if (!newGroup.trim()) return;
    const group: TodoGroup = {
      id: Date.now(),
      title: newGroup,
      tasks: [],
      createdAt: new Date(),
    };
    setGroups([...groups, group]);
    setNewGroup("");
  };

  // Удалить группу
  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  // Добавить задачу
  const handleAddTask = (groupId: number, text: string) => {
    if (!text.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setGroups(
      groups.map((g) =>
        g.id === groupId ? { ...g, tasks: [...g.tasks, newTask] } : g
      )
    );
  };

  // Удалить задачу
  const handleDeleteTask = (groupId: number, taskId: number) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) }
          : g
      )
    );
  };

  // Сортировка групп
  const handleSortGroups = (dir: "asc" | "desc") => {
    setGroups(
      [...groups].sort((a, b) =>
        dir === "asc"
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime()
      )
    );
  };

  // Сортировка задач внутри группы
  const handleSortTasks = (groupId: number, dir: "asc" | "desc") => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              tasks: [...g.tasks].sort((a, b) =>
                dir === "asc"
                  ? a.createdAt.getTime() - b.createdAt.getTime()
                  : b.createdAt.getTime() - a.createdAt.getTime()
              ),
            }
          : g
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Форма добавления группы */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          label="Новая группа"
          size="small"
        />
        <IconButton color="primary" onClick={handleAddGroup}>
          <AddIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => handleSortGroups("asc")}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => handleSortGroups("desc")}>
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>

      {/* Список групп */}
      {groups.map((group) => (
        <Card key={group.id} sx={{ mb: 2, maxWidth: 500, margin: "0 auto" }}>
          <CardHeader
            title={group.title}
            action={
              <IconButton onClick={() => handleDeleteGroup(group.id)} color="error">
                <DeleteIcon />
              </IconButton>
            }
          />
          <CardContent>
            {/* Добавление задачи */}
            <TaskInput groupId={group.id} onAddTask={handleAddTask} />

            {/* Сортировка задач */}
            <div style={{ marginBottom: 10 }}>
              <IconButton
                color="secondary"
                onClick={() => handleSortTasks(group.id, "asc")}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => handleSortTasks(group.id, "desc")}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </div>

            {/* Список задач */}
            <Stack spacing={1}>
              {group.tasks.map((task) => (
                <Card key={task.id} sx={{ p: 1 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>{task.text}</Typography>
                    <IconButton
                      onClick={() => handleDeleteTask(group.id, task.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// --- Ввод задачи ---
interface TaskInputProps {
  groupId: number;
  onAddTask: (groupId: number, text: string) => void;
}
const TaskInput: React.FC<TaskInputProps> = ({ groupId, onAddTask }) => {
  const [text, setText] = useState("");
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Новая задача"
        size="small"
      />
      <IconButton
        color="primary"
        onClick={() => {
          if (!text.trim()) return;
          onAddTask(groupId, text);
          setText("");
        }}
      >
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default App;
