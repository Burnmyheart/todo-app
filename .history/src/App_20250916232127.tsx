import React, { useState, useEffect } from "react";
import type { TodoGroup, Task } from "./types";
import { saveTodoGroups, loadTodoGroups } from "./utils/localStorage";
import { Button, TextField, Stack, Card, CardContent, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);
  const [newGroupTitle, setNewGroupTitle] = useState("");

  useEffect(() => {
    setGroups(loadTodoGroups());
  }, []);

  useEffect(() => {
    saveTodoGroups(groups);
  }, [groups]);

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
    setGroups(prev =>
      prev.map(group =>
        group.id === groupId
          ? {
              ...group,
              tasks: [
                ...group.tasks,
                { id: Date.now(), text, completed: false, createdAt: new Date() },
              ],
            }
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

  return (
    <div style={{ padding: 20 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField
          label="Новая общая задача"
          value={newGroupTitle}
          onChange={e => setNewGroupTitle(e.target.value)}
        />
        <Button variant="contained" onClick={addGroup}>
          Добавить
        </Button>
      </Stack>

      {groups.map(group => (
  <Card key={group.id} variant="outlined" sx={{ mb: 2, p: 2 }}>
    <h3>{group.title}</h3>

    <AddTaskForm groupId={group.id} onAdd={addTask} />

    <Stack spacing={1}>
      {group.tasks.map(task => (
        <div key={task.id} style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.completed}
            onChange={() => toggleTask(group.id, task.id)}
          />
          <span style={{ textDecoration: task.completed ? "line-through" : "none", flex: 1 }}>
            {task.text}
          </span>
          <IconButton onClick={() => deleteTask(group.id, task.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </Stack>
  </Card>
))}

    </div>
  );
};

// Форма добавления таска
const AddTaskForm: React.FC<{ groupId: number; onAdd: (groupId: number, text: string) => void }> = ({
  groupId,
  onAdd,
}) => {
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
