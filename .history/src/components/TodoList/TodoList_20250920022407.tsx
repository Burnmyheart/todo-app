import React, { useState } from "react";
import styled from "styled-components";
import type { TodoGroup, Task } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Button, Checkbox, TextField, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

interface TodoListProps {
  group: TodoGroup;
  onUpdateGroup: (updated: TodoGroup) => void;
}

const Card = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  max-width: 500px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
`;

const InputRow = styled.div`
  margin: 10px 0;
`;

const TodoItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Text = styled.span<{ completed: boolean }>`
  cursor: pointer;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup }) => {
  const [taskText, setTaskText] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (!taskText.trim()) {
      setError(true);
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date(),
    };
    const updatedTasks = sortOrder === "new" ? [newTask, ...group.tasks] : [...group.tasks, newTask];
    onUpdateGroup({ ...group, tasks: updatedTasks });
    setTaskText("");
    setError(false);
  };

  const toggleTask = (id: number) => {
    const updatedTasks = group.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    onUpdateGroup({ ...group, tasks: updatedTasks });
  };

  const deleteTask = (id: number) => {
    const updatedTasks = group.tasks.filter((task) => task.id !== id);
    onUpdateGroup({ ...group, tasks: updatedTasks });
  };

  const startEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  const saveEditTask = (id: number) => {
    const updatedTasks = group.tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    );
    onUpdateGroup({ ...group, tasks: updatedTasks });
    setEditTaskId(null);
    setEditText("");
  };

  const filteredTasks = group.tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "new"
      ? b.createdAt.getTime() - a.createdAt.getTime()
      : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <Card>
      <TitleRow>
        <Title>{group.title}</Title>
        <div>
          <IconButton onClick={() => setSortOrder("new")} size="small" title="Сначала новые">
            <span>⬆️</span>
          </IconButton>
          <IconButton onClick={() => setSortOrder("old")} size="small" title="Сначала старые">
            <span>⬇️</span>
          </IconButton>
        </div>
      </TitleRow>

      {/* Форма добавления задачи */}
      <InputRow>
        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
          <TextField
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value);
              setError(false);
            }}
            size="small"
            placeholder="Новая задача..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            error={error}
            helperText={error ? "Поле не может быть пустым" : ""}
            fullWidth
          />
          <Button variant="contained" onClick={addTask}>
            +
          </Button>
        </Stack>
      </InputRow>

      {/* Фильтр */}
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_e, val) => val && setFilter(val)}
        size="small"
        sx={{ mb: 1 }}
      >
        <ToggleButton value="all">Все</ToggleButton>
        <ToggleButton value="active">Неготовые</ToggleButton>
        <ToggleButton value="completed">Готовые</ToggleButton>
      </ToggleButtonGroup>

      {/* Список задач */}
      {sortedTasks.map((task) => (
        <TodoItemRow key={task.id}>
          <LeftSide>
            <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} color="primary" />
            {editTaskId === task.id ? (
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                size="small"
                onKeyDown={(e) => e.key === "Enter" && saveEditTask(task.id)}
                autoFocus
              />
            ) : (
              <Text completed={task.completed}>{task.text}</Text>
            )}
          </LeftSide>
          <div>
            {editTaskId === task.id ? (
              <IconButton onClick={() => saveEditTask(task.id)} color="primary">
                <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => startEditTask(task)} color="info">
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => deleteTask(task.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </TodoItemRow>
      ))}
    </Card>
  );
};

export default TodoList;
