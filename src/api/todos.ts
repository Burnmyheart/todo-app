import axios from "axios";

const API_URL = "http://localhost:3001";


export type TodoFilter = "all" | "active" | "completed";


export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string; 
}


export const fetchTodos = async (page: number, limit: number, filter: TodoFilter) => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { page, limit, filter },
  });
  return response.data;
};


export const createTodo = async (text: string) => {
  const response = await axios.post(`${API_URL}/todos`, { text });
  return response.data;
};


export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/todos/${id}`);
};


export const updateTodo = async (id: number, data: Partial<Todo>) => {
  const response = await axios.put(`${API_URL}/todos/${id}`, data);
  return response.data;
};

export const toggleTodo = async (id: number) => {
  const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
  return response.data;
};
