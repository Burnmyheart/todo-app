import React from "react";
import type { Task } from "../../types";
import { Card, CardContent, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Card variant="outlined">
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
        <span style={{ textDecoration: task.completed ? "line-through" : "none", flex: 1 }}>
          {task.text}
        </span>
        <IconButton onClick={() => onDelete(task.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
