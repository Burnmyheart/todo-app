import React, { useState } from "react";
import { TextField, IconButton, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <Stack direction="row" spacing={1}>
      <TextField
        fullWidth
        size="small"
        label="Название группы"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <IconButton color="primary" onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
};

export default AddTodo;
