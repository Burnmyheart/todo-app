import  { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import AddTodo from "../AddTodo/AddTodo";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  onUpdateTasks: (tasks: Task[]) => void;
}
 function TaskList({ tasks, onUpdateTasks }: TaskListProps) {
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false, createdAt: new Date() };
    onUpdateTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    onUpdateTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (id: number, text: string) => {
    onUpdateTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
  };

  const deleteTask = (id: number) => {
    onUpdateTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t =>
    filter === "completed" ? t.completed : filter === "active" ? !t.completed : true
  );

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "new" ? b.createdAt.getTime() - a.createdAt.getTime() : a.createdAt.getTime() - b.createdAt.getTime()
  );

  return (
    <>
      <AddTodo onAdd={addTask} placeholder="Новая задача..." />

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <ToggleButtonGroup value={filter} exclusive onChange={(_e, val) => val && setFilter(val)} size="small">
          <ToggleButton value="all">Все</ToggleButton>
          <ToggleButton value="active">Неготовые</ToggleButton>
          <ToggleButton value="completed">Готовые</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup value={sortOrder} exclusive onChange={(_e, val) => val && setSortOrder(val)} size="small">
          <ToggleButton value="new">Новые</ToggleButton>
          <ToggleButton value="old">Старые</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {sortedTasks.map(task => (
        <TodoItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
      ))}

      {sortedTasks.length === 0 && <p>Нет задач</p>}
    </>
  );
}


export default TaskList;