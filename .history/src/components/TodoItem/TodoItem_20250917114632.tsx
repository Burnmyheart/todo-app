import React from "react";
import styled from "styled-components";
import type { Task } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  border-bottom: 1px solid #ddd;
`;

const Text = styled.span<{ completed: boolean }>`
  flex: 1;
  cursor: pointer;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Container>
      <Text completed={task.completed} onClick={() => onToggle(task.id)}>
        {task.text}
      </Text>
      <IconButton onClick={() => onDelete(task.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </Container>
  );
};

export default TodoItem;
