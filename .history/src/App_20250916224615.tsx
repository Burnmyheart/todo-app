import React, { useState, useEffect } from "react";
import type { TodoType } from "./types";
import { saveTodos, loadTodos } from "./utils/localStorage";
import TodoList from "./components/TodoList/TodoList";
import AddTodo from "./components/AddTodo/AddTodo";

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: TodoType = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
