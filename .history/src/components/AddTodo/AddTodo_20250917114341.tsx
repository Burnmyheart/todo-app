import React, { useState } from "react";
import styled from "styled-components";
import type { TodoType } from "../../types";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: #646cff;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  margin-top: 5px;
`;

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (value.trim() === "") {
      setError("Поле не может быть пустым");
      return;
    }
    onAdd(value);
    setValue("");
    setError("");
  };

  return (
    <div>
      <Container>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите задачу..."
        />
        <Button onClick={handleAdd}>Добавить</Button>
      </Container>
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default AddTodo;
