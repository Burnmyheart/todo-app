import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) {
      setError(true);
      return;
    }
    onAdd(text);
    setText("");
    setError(false);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <TextField
        value={text}
        onChange={(e) => { setText(e.target.value); setError(false); }}
        size="small"
        placeholder="Новая задача..."
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        error={error}
        helperText={error ? "Поле не может быть пустым" : ""}
        fullWidth
      />
      <Button variant="contained" onClick={handleAdd}>+</Button>
    </Stack>
  );
};

export default AddTodo;
