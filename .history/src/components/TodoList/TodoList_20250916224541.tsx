import React from "react";
import { TodoType } from "../../types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p>Задач пока нет</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
