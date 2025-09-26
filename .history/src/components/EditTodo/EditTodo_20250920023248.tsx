import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface EditTodoProps {
  text: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const EditTodo: React.FC<EditTodoProps> = ({ text, onSave, onCancel }) => {
  const [value, setValue] = useState(text);

  return (
    <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        size="small"
        onKeyDown={(e) => e.key === "Enter" && onSave(value)}
        autoFocus
        fullWidth
      />
      <Button variant="contained" onClick={() => onSave(value)}>Сохранить</Button>
      <Button variant="outlined" onClick={onCancel}>Отмена</Button>
    </Stack>
  );
};

export default EditTodo;
