import React from "react";
import styled from "styled-components";
import type { Task } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Checkbox } from "@mui/material";

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

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Container>
      <LeftSide>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          color="primary"
        />
        <Text completed={task.completed}>{task.text}</Text>
      </LeftSide>
      <IconButton onClick={() => onDelete(task.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </Container>
  );
};

export default TodoItem;
