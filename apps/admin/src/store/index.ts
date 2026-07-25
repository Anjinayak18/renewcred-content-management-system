import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/slices/authSlice";
import dashboardReducer from "@/store/slices/dashboardSlice";
import pageReducer from "@/store/slices/pageSlice";
import mediaReducer from "@/store/slices/mediaSlice";
import userReducer from "@/store/slices/userSlice";
import { api } from "@/store/services/api";

export const store = configureStore({
  reducer: {
  auth: authReducer,
  dashboard: dashboardReducer,
  page: pageReducer,
  media: mediaReducer,
  user: userReducer,

  [api.reducerPath]: api.reducer
},

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

  devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;