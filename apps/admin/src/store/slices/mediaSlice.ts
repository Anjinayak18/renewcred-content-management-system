import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from "@reduxjs/toolkit";

import mediaService from "@/services/mediaService";

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  createdAt: string;
}

interface MediaFilters {
  search: string;
  type: "all" | "image" | "video" | "document";
}

interface MediaState {
  files: MediaFile[];
  selectedFile: MediaFile | null;
  filters: MediaFilters;
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: MediaState = {
  files: [],
  selectedFile: null,
  filters: {
    search: "",
    type: "all"
  },
  loading: false,
  uploading: false,
  error: null
};

/* ============================
   THUNKS
============================ */

export const fetchMedia = createAsyncThunk(
  "media/fetchMedia",
  async () => {
    const response = await mediaService.getFiles();

    return response.data || response;
  }
);

export const uploadMedia = createAsyncThunk(
  "media/uploadMedia",
  async (file: File) => {
    const response =
      await mediaService.uploadFile(file);

    return response.data || response;
  }
);

export const deleteMedia = createAsyncThunk(
  "media/deleteMedia",
  async (filename: string) => {
    await mediaService.deleteFile(filename);

    return filename;
  }
);

const mediaSlice = createSlice({
  name: "media",

  initialState,

  reducers: {
    setSelectedFile(
      state,
      action: PayloadAction<MediaFile | null>
    ) {
      state.selectedFile = action.payload;
    },

    setSearchFilter(
      state,
      action: PayloadAction<string>
    ) {
      state.filters.search = action.payload;
    },

    setTypeFilter(
      state,
      action: PayloadAction<
        "all" | "image" | "video" | "document"
      >
    ) {
      state.filters.type = action.payload;
    }
  },

  extraReducers(builder) {
    builder

      .addCase(fetchMedia.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchMedia.fulfilled,
        (state, action) => {
          state.loading = false;
          state.files = action.payload;
        }
      )

      .addCase(
        fetchMedia.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Unable to fetch media";
        }
      )

      .addCase(uploadMedia.pending, (state) => {
        state.uploading = true;
      })

      .addCase(
        uploadMedia.fulfilled,
        (state, action) => {
          state.uploading = false;

          state.files.unshift(action.payload);
        }
      )

      .addCase(
        uploadMedia.rejected,
        (state, action) => {
          state.uploading = false;
          state.error =
            action.error.message ??
            "Upload failed";
        }
      )

      .addCase(
        deleteMedia.fulfilled,
        (state, action) => {
          state.files = state.files.filter(
            (file) =>
              file.filename !==
              action.payload
          );
        }
      );
  }
});

export const {
  setSelectedFile,
  setSearchFilter,
  setTypeFilter
} = mediaSlice.actions;

export default mediaSlice.reducer;