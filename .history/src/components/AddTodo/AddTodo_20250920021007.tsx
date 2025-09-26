import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface AddTodoProps {
  onAdd: (text: string) => void;
  placeholder?: string; 
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, placeholder }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleAdd = () => {
    if (!value.trim()) {
      setError(true);
      return;
    }
    onAdd(value);
    setValue("");
    setError(false);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 2, mb: 2 }}>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(false);
        }}
        size="small"
        label={placeholder || "Введите задачу"} 
        error={error}
        helperText={error ? "Поле не может быть пустым" : ""}
      />
      <Button variant="contained" onClick={handleAdd}>
        +
      </Button>
    </Stack>
  );
};

export default AddTodo;
