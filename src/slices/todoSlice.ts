import { fetchTodos } from "../api/todos";
import type { TodoFilter, Todo } from "../api/todos";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  filter: TodoFilter;
}

// Начальное состояние
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  totalPages: 1,
  filter: "all",
};


export const loadTodos = createAsyncThunk(
  "todos/loadTodos",
  async (_, { getState }) => {
    const state = getState() as { todos: TodoState };
    const { page, limit, filter } = state.todos;
    const data = await fetchTodos(page, limit, filter);
    return data; 
  }
);


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setFilter(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload;
      state.page = 1; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.data;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке";
      });
  },
});

export const { setPage, setLimit, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
