import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001";

interface User {
  id: number;
  email: string;
  age?: number;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("accessToken"),
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk<
  string,
  { email: string; password: string; age?: number },
  { rejectValue: string }
>("auth/registerUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || "Ошибка регистрации");
    }
    return rejectWithValue("Не удалось подключиться к серверу");
  }
});

export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (data, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, data);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || "Неверный логин или пароль");
    }
    return rejectWithValue("Сервер недоступен");
  }
});

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { state: { auth: AuthState }; rejectValue: string }
>("auth/fetchUserProfile", async (_, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || "Не удалось загрузить профиль");
    }
    return rejectWithValue("Ошибка соединения с сервером");
  }
});

export const changePassword = createAsyncThunk<
  void,
  { oldPassword: string; newPassword: string },
  { state: { auth: AuthState }; rejectValue: string }
>("auth/changePassword", async (data, { getState, rejectWithValue }) => {
  try {
    const token = getState().auth.token;
    await axios.post(`${API_URL}/auth/change-password`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message || "Не удалось сменить пароль");
    }
    return rejectWithValue("Ошибка соединения с сервером");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка регистрации";
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка входа";
      });

    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка загрузки профиля";
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка смены пароля";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
