import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Kullanıcı kaydı için thunk
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        userData
      );
      return response.data;
    } catch (error) {
      console.log(error, "Kayıt başarısız");
      return rejectWithValue(
        error.response?.data?.error || "Kayıt işlemi başarısız."
      );
    }
  }
);

// Kullanıcı girişi için thunk
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData
      );
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.log(error, "Giriş başarısız!");
      return rejectWithValue(
        error.response?.data?.error || "Sunucu bağlantısı hatası!"
      );
    }
  }
);

// userSlice oluşturma
export const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload; // Kullanıcı bilgilerini ayarla
    },
    clearUser: (state) => {
      state.currentUser = null; // Kullanıcıyı temizle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Reducer'ı dışa aktar
export const { clearError, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
