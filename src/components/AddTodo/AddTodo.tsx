import { useCallback, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

interface AddTodoProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

function AddTodo({ onAdd, placeholder }: AddTodoProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);


  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError(false); 
  }, []);
  
  const handleAdd = useCallback(() => {
    if (text.trim() === "") {
      setError(true);
      return;
    }
    onAdd(text);
    setText("");
    setError(false);
  }, [text, onAdd]);

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <TextField
        value={text}
        onChange={handleChange}
        size="small"
        placeholder={placeholder ?? "Новый элемент..."}
        aria-label={placeholder ?? "Добавить"}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        error={error}
        helperText={error ? "Поле не может быть пустым" : ""}
      />
      <Button variant="contained" onClick={handleAdd} aria-label="Добавить">
        +
      </Button>
    </Stack>
  );
}

export default AddTodo;
