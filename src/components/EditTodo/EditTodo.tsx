import React, { useState } from "react";
import styled from "styled-components";

interface EditTodoProps {
  text: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const Input = styled.input`
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  margin-left: 8px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const EditTodo: React.FC<EditTodoProps> = ({ text, onSave, onCancel }) => {
  const [value, setValue] = useState(text);

  const handleSave = () => {
    if (value.trim() === "") return;
    onSave(value.trim());
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={handleSave} disabled={value.trim() === ""}>
        Сохранить
      </Button>
      <Button onClick={onCancel}>Отмена</Button>
    </div>
  );
};

export default EditTodo;
