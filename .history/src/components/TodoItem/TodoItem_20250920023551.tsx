import React, { useState } from "react";
import type { Task } from "../../types";
import { IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTodo from "../EditTodo/EditTodo";
import styled from "styled-components";

const Container = styled.div`
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
  flex: 1;
`;

const Text = styled.span<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <LeftSide>
        <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} color="primary" />
        {isEditing ? (
          <EditTodo
            text={task.text}
            onSave={(text) => { onEdit(task.id, text); setIsEditing(false); }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <Text completed={task.completed}>{task.text}</Text>
        )}
      </LeftSide>

      {!isEditing && (
        <>
          <IconButton onClick={() => setIsEditing(true)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Container>
  );
};

export default TodoItem;
