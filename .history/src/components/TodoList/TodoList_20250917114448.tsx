import React, { useState } from "react";
import styled from "styled-components";
import type { TodoGroup, Task } from "../../types";
import TodoItem from "../TodoItem/TodoItem";

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

const Title = styled.h3`
  margin: 0 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TodoList: React.FC<TodoListProps> = ({ group, onUpdateGroup }) => {
  const [taskText, setTaskText] = useState("");

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

  return (
    <Card>
      <Title>{group.title}</Title>
      <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Новая задача..."
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      {group.tasks.map((task) => (
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
