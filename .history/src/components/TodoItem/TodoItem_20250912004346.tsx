import { useState } from 'react';
import styled from 'styled-components';
import type { TodoType } from '../../types';
import { EditTodo } from '../EditTodo/EditTodo';

const Item = styled.li<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border || '#eee'};
  background: ${({ theme }) => theme.background || '#fff'};
  transition: all 0.2s ease;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.hoverBackground || '#f8f9fa'};
  }
`;

const TodoText = styled.span<{ completed: boolean }>`
  flex: 1;
  cursor: pointer;
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};
  margin-right: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const Button = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
  
  background-color: ${({ variant }) => {
    if (variant === 'danger') return '#ff4757';
    if (variant === 'primary') return '#3742fa';
    return '#f1f2f6';
  }};
  
  color: ${({ variant }) => {
    if (variant === 'danger' || variant === 'primary') return 'white';
    return '#333';
  }};

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

interface Props {
  todo: TodoType;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Item completed={todo.completed}>
      {isEditing ? (
        <EditTodo
          text={todo.text}
          save={(newText) => {
            editTodo(todo.id, newText);
            setIsEditing(false);
          }}
          cancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <TodoText 
            completed={todo.completed}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </TodoText>
          <ButtonGroup>
            <Button 
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              
            </Button>
            <Button 
              variant="danger"
              onClick={() => deleteTodo(todo.id)}
            >
              
            </Button>
          </ButtonGroup>
        </>
      )}
    </Item>
  );
};
