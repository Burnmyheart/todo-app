import type { TodoType } from "../types";


const STORAGE_KEY = "todos";

export const saveTodos = (todos: TodoType[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = (): TodoType[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data).map((todo: TodoType) => ({
    ...todo,
    createdAt: new Date(todo.createdAt), // восстановление Date
  })) : [];
};