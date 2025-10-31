import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TodoFilter, Todo } from "../api/todos";
import { fetchTodos } from "../api/todos";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  filter: TodoFilter;
}

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
  async (
    params: { page: number; limit: number; filter: TodoFilter; token: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchTodos(params.page, params.limit, params.filter, params.token);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Ошибка при загрузке задач");
    }
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
      .addCase(
        loadTodos.fulfilled,
        (state, action: PayloadAction<{ data: Todo[]; totalPages: number }>) => {
          state.loading = false;
          state.todos = action.payload.data;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setLimit, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
