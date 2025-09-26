import type { TodoType } from "../types";

export const saveTodos = (todos: TodoType[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  
  export const loadTodos = (): TodoType[] => {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  };