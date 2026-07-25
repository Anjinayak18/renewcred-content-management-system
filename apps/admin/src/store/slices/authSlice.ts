import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const getStoredToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

const initialState: AuthState = {
  user: null,
  accessToken: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart(state) {
      state.loading = true;
    },

    loginSuccess(
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
      }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "accessToken",
          action.payload.accessToken
        );

        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
      }
    },

    loginFailure(state) {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    },

    logout(state) {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    },

    restoreSession(state) {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (token) {
        state.accessToken = token;
        state.isAuthenticated = true;
      }

      if (user) {
        state.user = JSON.parse(user);
      }
    },

    setUser(
      state,
      action: PayloadAction<User>
    ) {
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload)
        );
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;