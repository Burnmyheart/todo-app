import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
`;

interface Props {
  addTodo: (text: string) => void;
}

export const AddTodo = ({ addTodo }: Props) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Поле не может быть пустым');
      return;
    }
    addTodo(text.trim());
    setText('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input value={text} onChange={e => setText(e.target.value)} placeholder="Новая задача" />
      <Button type="submit">Добавить</Button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </Form>
  );
};