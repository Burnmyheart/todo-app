import React, { useState } from "react";
import styled from "styled-components";
import type { Task } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton, Checkbox, TextField } from "@mui/material";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void; // новая пропса для редактирования
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

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const saveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <LeftSide>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          color="primary"
        />
        {isEditing ? (
          <TextField
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            autoFocus
          />
        ) : (
          <Text completed={task.completed}>{task.text}</Text>
        )}
      </LeftSide>

      <div>
        {isEditing ? (
          <IconButton onClick={saveEdit} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} color="info">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => onDelete(task.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </di
