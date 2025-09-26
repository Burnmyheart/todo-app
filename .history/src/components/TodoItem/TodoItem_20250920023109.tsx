import React, { useState } from "react";
import styled from "styled-components";
import type { Task } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Checkbox } from "@mui/material";
import EditTodo from "../EditTodo/EditTodo";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
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

  return (
    <Container>
      <LeftSide>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          color="primary"
        />
        {isEditing ? (
          <EditTodo
            text={task.text}
            onSave={(newText) => {
              onEdit(task.id, newText);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <Text completed={task.completed}>{task.text}</Text>
        )}
      </LeftSide>

      {!isEditing && (
        <div>
          <IconButton onClick={() => setIsEditing(true)} color="info">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </Container>
  );
};

export default TodoItem;
