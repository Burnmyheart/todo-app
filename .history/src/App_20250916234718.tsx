// App.tsx
import React, { useState, useEffect } from "react";
import type { TodoGroup, Task } from "./types";
import { saveTodoGroups, loadTodoGroups } from "./utils/localStorage";
import styled from "styled-components";
import { Button, TextField, Stack, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const GroupCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  max-height: 300px;
  overflow-y: auto;
`;

const TaskItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 8px;
  background-color: ${({ completed }) => (completed ? "#e0e0e0" : "#f9f9f9")};
  margin-bottom: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ completed }) => (completed ? "#d0d0d0" : "#f0f0f0")};
  }
`;

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [newGroupTitle, setNewGroupTitle] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [filter, setFilter] = useState<"all" | "done" | "not-done">("all");

  useEffect(() => setGroups(loadTodoGroups()), []);
  useEffect(() => saveTodoGroups(groups), [groups]);

  const addGroup = () => {
    if (!newGroupTitle.trim()) return;
    const newGroup: TodoGroup = {
      id: Date.now(),
      title: newGroupTitle,
      tasks: [],
      createdAt: new Date(),
    };
    setGroups([...groups, newGroup]);
    setNewGroupTitle("");
  };

  const addTask = (groupId: number, text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: [...group.tasks, newTask] }
          : group
      )
    );
  };

  const toggleTask = (groupId: number, taskId: number) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: group.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : group
      )
    );
  };

  const deleteTask = (groupId: number, taskId: number) => {
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? { ...group, tasks: group.tasks.filter(task => task.id !== taskId) }
          : group
      )
    );
  };

  // Сортировка групп
  const sortedGroups = [...groups].sort((a, b) =>
    sortOrder === "new"
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <Container>
      {/* Добавление новой группы */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Новая общая задача"
          value={newGroupTitle}
          onChange={e => setNewGroupTitle(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={addGroup}>
          Добавить
        </Button>
      </Stack>

      {/* Сортировка групп */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Button
          variant={sortOrder === "new" ? "contained" : "outlined"}
          onClick={() => setSortOrder("new")}
        >
          Новые сверху
        </Button>
        <Button
          variant={sortOrder === "old" ? "contained" : "outlined"}
          onClick={() => setSortOrder("old")}
        >
          Старые сверху
        </Button>
      </Stack>

      {/* Фильтр тасков */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
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

      {/* Список групп */}
      {sortedGroups.map(group => {
        // Фильтруем таски внутри группы
        const filteredTasks = group.tasks.filter(task => {
          if (filter === "done") return task.completed;
          if (filter === "not-done") return !task.completed;
          return true;
        });

        return (
          <GroupCard key={group.id}>
            <h3>{group.title}</h3>
            <AddTaskForm groupId={group.id} onAdd={addTask} />

            {filteredTasks.map(task => (
              <TaskItem key={task.id} completed={task.completed}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => toggleTask(group.id, task.id)}
                />
                <span style={{ flex: 1, textDecoration: task.completed ? "line-through" : "none" }}>
                  {task.text}
                </span>
                <IconButton onClick={() => deleteTask(group.id, task.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TaskItem>
            ))}
          </GroupCard>
        );
      })}
    </Container>
  );
};

// Форма добавления таска
const AddTaskForm: React.FC<{
  groupId: number;
  onAdd: (groupId: number, text: string) => void;
}> = ({ groupId, onAdd }) => {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(groupId, value);
    setValue("");
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <TextField
        label="Новая задача"
        value={value}
        onChange={e => setValue(e.target.value)}
        size="small"
      />
      <Button variant="contained" onClick={handleAdd}>
        Добавить
      </Button>
    </Stack>
  );
};

export default App;
