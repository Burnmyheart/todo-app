import React, { useState } from "react";
import { Checkbox, IconButton, TextField, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import type { Task } from "../../types";

interface TodoItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleSave = () => {
    if (!text.trim()) return;
    onEdit(text);
    setIsEditing(false);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Checkbox checked={task.completed} onChange={onToggle} />
      {isEditing ? (
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="small"
          autoFocus
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            flex: 1,
          }}
        >
          {task.text}
        </span>
      )}
      {isEditing ? (
        <IconButton color="primary" onClick={handleSave}>
          <SaveIcon />
        </IconButton>
      ) : (
        <IconButton color="primary" onClick={() => setIsEditing(true)}>
          <EditIcon />
        </IconButton>
      )}
      <IconButton color="error" onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
};

export default TodoItem;
