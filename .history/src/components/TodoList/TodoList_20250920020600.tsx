import React, { useState } from "react";
import styled from "styled-components";
import type { TodoGroup, Task } from "../../types";
import TodoItem from "../TodoItem/TodoItem";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { IconButton } from "@mui/material";

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
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup }) => {
  const [taskText, setTaskText] = useState("");
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date(),
    };
    onUpdateGroup({ ...group, tasks: [...group.tasks, newTask] });
    setTaskText("");
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

  const sortedTasks = [...group.tasks].sort((a, b) =>
    sortOrder === "new"
      ? b.createdAt.toString().localeCompare(a.createdAt.toString())
      : a.createdAt.toString().localeCompare(b.createdAt.toString())
  );

  return (
    <Card>
      <TitleRow>
        <Title>{group.title}</Title>
        <div>
          <IconButton onClick={() => setSortOrder("new")} size="small">
            <ArrowUpwardIcon
              color={sortOrder === "new" ? "primary" : "inherit"}
            />
          </IconButton>
          <IconButton onClick={() => setSortOrder("old")} size="small">
            <ArrowDownwardIcon
              color={sortOrder === "old" ? "primary" : "inherit"}
            />
          </IconButton>
        </div>
      </TitleRow>

      <InputRow>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        size="small"
        label={placeholder || "Введите задачу"} 
        error={error}
        helperText={error ? "Поле не может быть пустым" : ""}
      />
        {/* <Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Новая задача..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Добавить</button> */}
      </InputRow>

      {sortedTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      ))}
    </Card>
  );
};

export default TodoList;
