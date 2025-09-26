import React, { useState } from "react";
import styled from "styled-components";
import type { TodoType } from "../../types";
import EditTodo from "../EditTodo/EditTodo";

interface TodoItemProps {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
`;

const Text = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      {isEditing ? (
        <EditTodo
          text={todo.text}
          onSave={(newText) => {
            onEdit(todo.id, newText);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Text completed={todo.completed} onClick={() => onToggle(todo.id)}>
            {todo.text}
          </Text>
          <div>
            <button onClick={() => setIsEditing(true)}>Редактировать</button>
            <button onClick={() => onDelete(todo.id)}>Удалить</button>
          </div>
        </>
      )}
    </Container>
  );
};

export default TodoItem;
