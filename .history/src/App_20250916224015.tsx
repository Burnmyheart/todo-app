import { useState, useEffect } from "react";
import { AddTodo } from "./components/AddTodo/AddTodo";
import { TodoList } from './components/TodoList/TodoList';
import type { TodoType } from "./types";
import { saveTodos, loadTodos } from "./utils/localStorage";
import { ThemeProvider } from "./components/theme/ThemeContext";
import DenseAppBar from "./components/menu/Menu"; 
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 2rem;
  font-weight: 600;
`;

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: TodoType = { id: Date.now().toString(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <ThemeProvider>
      <DenseAppBar />
      <Wrapper>
        <Header>Todo App</Header>
        <AddTodo addTodo={addTodo} />
        {/* <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        /> */}
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
