import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!value.trim()) {
      setError("Поле не может быть пустым");
      return;
    }
    onAdd(value);
    setValue("");
    setError("");
  };

  return (
    <div>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Новая задача"
        error={!!error}
        helperText={error}
      />
      <Button onClick={handleAdd} variant="contained">
        Добавить
      </Button>
    </div>
  );
};

export default AddTodo;
