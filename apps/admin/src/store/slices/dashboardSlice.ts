import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import dashboardService from "@/services/dashboardService";

export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalMedia: number;
  totalUsers: number;
  storageUsed: number;
}

interface DashboardState {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  stats: {
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalMedia: 0,
    totalUsers: 0,
    storageUsed: 0,
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

export const fetchDashboard =
  createAsyncThunk(
    "dashboard/fetchDashboard",
    async () => {
      const response =
        await dashboardService.getDashboard();

      return {
        totalPages:
          response.data.pages.total,

        publishedPages:
          response.data.pages.published,

        draftPages:
          response.data.pages.draft,

        totalUsers:
          response.data.users.total,

        // Temporary until backend returns media count
        totalMedia: response.data.media.total,

        storageUsed: 0,
      };
    }
  );

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    clearDashboardError(state) {
      state.error = null;
    },

    resetDashboard(state) {
      state.stats =
        initialState.stats;

      state.loading = false;
      state.error = null;
      state.lastUpdated = null;
    },
  },

  extraReducers(builder) {
    builder

      .addCase(
        fetchDashboard.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchDashboard.fulfilled,
        (state, action) => {
          state.loading = false;

          state.stats =
            action.payload;

          state.lastUpdated =
            new Date().toISOString();
        }
      )

      .addCase(
        fetchDashboard.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message ??
            "Unable to load dashboard.";
        }
      );
  },
});

export const {
  clearDashboardError,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;