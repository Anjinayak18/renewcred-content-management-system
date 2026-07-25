import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",

  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    headers.set("Content-Type", "application/json");

    return headers;
  }
});

export const api = createApi({
  reducerPath: "api",

  baseQuery,

  tagTypes: [
    "Auth",
    "Dashboard",
    "Pages",
    "Media",
    "Users"
  ],

  endpoints: () => ({})
});