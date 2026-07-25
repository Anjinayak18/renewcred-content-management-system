import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import userService, {
  UserPayload,
} from "@/services/userService";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "AUTHOR";
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

/* ============================
   THUNKS
============================ */

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await userService.getUsers();
    return response.data || response;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: UserPayload) => {
    const response = await userService.createUser(data);
    return response.data || response;
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<UserPayload>;
  }) => {
    const response = await userService.updateUser(
      id,
      data
    );

    return response.data || response;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string) => {
    await userService.deleteUser(id);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    setSelectedUser(
      state,
      action: PayloadAction<User | null>
    ) {
      state.selectedUser = action.payload;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchUsers.fulfilled,
        (state, action) => {
          state.loading = false;
          state.users = action.payload;
        }
      )

      .addCase(
        fetchUsers.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Unable to fetch users";
        }
      )

      .addCase(
        createUser.fulfilled,
        (state, action) => {
          state.users.unshift(action.payload);
        }
      )

      .addCase(
        updateUser.fulfilled,
        (state, action) => {
          const index = state.users.findIndex(
            (user) =>
              user._id === action.payload._id
          );

          if (index !== -1) {
            state.users[index] =
              action.payload;
          }
        }
      )

      .addCase(
        deleteUser.fulfilled,
        (state, action) => {
          state.users = state.users.filter(
            (user) =>
              user._id !== action.payload
          );
        }
      );
  },
});

export const { setSelectedUser } =
  userSlice.actions;

export default userSlice.reducer;