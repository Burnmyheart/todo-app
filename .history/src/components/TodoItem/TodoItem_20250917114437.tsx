import React, { useState } from "react";
import styled from "styled-components";
import type { Task } from "../../types";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
  border-bottom: 1px solid #ddd;
`;

const Text = styled.span<{ completed: boolean }>`
  cursor: pointer;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;

const TodoItem: React.FC<TodoItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Container>
      <Text completed={task.completed} onClick={() => onToggle(task.id)}>
        {task.text}
      </Text>
      <button onClick={() => onDelete(task.id)}>Удалить</button>
    </Container>
  );
};

export default TodoItem;
