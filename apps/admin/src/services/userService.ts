import api from "@/lib/axios";

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: "ADMIN" | "EDITOR" | "AUTHOR";
  isActive?: boolean;
}

const userService = {
  async getUsers() {
    const response = await api.get("/users");
    return response.data;
  },

  async createUser(data: UserPayload) {
    const response = await api.post("/users", data);
    return response.data;
  },

  async updateUser(
    id: string,
    data: Partial<UserPayload>
  ) {
    const response = await api.put(
      `/users/${id}`,
      data
    );

    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(
      `/users/${id}`
    );

    return response.data;
  }
};

export default userService;