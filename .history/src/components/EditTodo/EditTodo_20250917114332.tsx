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

const Button = styled.button`
  margin-left: 8px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const EditTodo: React.FC<EditTodoProps> = ({ text, onSave, onCancel }) => {
  const [value, setValue] = useState(text);

  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => onSave(value)}>Сохранить</Button>
      <Button onClick={onCancel}>Отмена</Button>
    </div>
  );
};

export default EditTodo;
