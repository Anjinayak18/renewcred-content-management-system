import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import pageService from "@/services/pageService";

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface PageFilters {
  search: string;
  status: "all" | "draft" | "published";
}

interface PageState {
  pages: Page[];
  selectedPage: Page | null;
  filters: PageFilters;
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
  pages: [],
  selectedPage: null,
  filters: {
    search: "",
    status: "all",
  },
  loading: false,
  error: null,
};

/* ------------------------- THUNKS ------------------------- */

export const fetchPages = createAsyncThunk(
  "page/fetchPages",
  async () => {
    const response = await pageService.getPages();
    const pages = response.data || response.pages || response;
    
    // Transform pages to match frontend interface
    return Array.isArray(pages) ? pages.map((page: any) => ({
      id: page._id || page.id,
      title: page.title,
      slug: page.slug,
      content: Array.isArray(page.content) 
        ? page.content.map((c: any) => c.content || c).join(' ')
        : page.content || '',
      status: (page.status || 'DRAFT').toLowerCase() as "draft" | "published",
      author: typeof page.author === 'object' 
        ? `${page.author.firstName} ${page.author.lastName}`
        : page.author || '',
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    })) : [];
  }
);

export const createPage = createAsyncThunk(
  "page/createPage",
  async (data: Omit<Page, "id" | "author" | "createdAt" | "updatedAt">) => {
    const response = await pageService.createPage(data);
    const page = response.data || response;
    
    // Transform page to match frontend interface
    return {
      id: page._id || page.id,
      title: page.title,
      slug: page.slug,
      content: Array.isArray(page.content)
        ? page.content.map((c: any) => c.content || c).join(' ')
        : page.content || '',
      status: (page.status || 'DRAFT').toLowerCase() as "draft" | "published",
      author: typeof page.author === 'object'
        ? `${page.author.firstName} ${page.author.lastName}`
        : page.author || '',
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    };
  }
);

export const updatePage = createAsyncThunk(
  "page/updatePage",
  async ({
    id,
    data,
  }: {
    id: string;
    data: Omit<Page, "id" | "author" | "createdAt" | "updatedAt">;
  }) => {
    const response = await pageService.updatePage(id, data);
    const page = response.data || response;
    
    // Transform page to match frontend interface
    return {
      id: page._id || page.id,
      title: page.title,
      slug: page.slug,
      content: Array.isArray(page.content)
        ? page.content.map((c: any) => c.content || c).join(' ')
        : page.content || '',
      status: (page.status || 'DRAFT').toLowerCase() as "draft" | "published",
      author: typeof page.author === 'object'
        ? `${page.author.firstName} ${page.author.lastName}`
        : page.author || '',
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    };
  }
);

export const deletePage = createAsyncThunk(
  "page/deletePage",
  async (id: string) => {
    await pageService.deletePage(id);
    return id;
  }
);

export const publishPage = createAsyncThunk(
  "page/publishPage",
  async (id: string) => {
    const response = await pageService.publishPage(id);
    const page = response.data || response;
    
    // Transform page to match frontend interface
    return {
      id: page._id || page.id,
      title: page.title,
      slug: page.slug,
      content: Array.isArray(page.content)
        ? page.content.map((c: any) => c.content || c).join(' ')
        : page.content || '',
      status: (page.status || 'DRAFT').toLowerCase() as "draft" | "published",
      author: typeof page.author === 'object'
        ? `${page.author.firstName} ${page.author.lastName}`
        : page.author || '',
      createdAt: page.createdAt,
      updatedAt: page.updatedAt
    };
  }
);

/* ------------------------- SLICE ------------------------- */

const pageSlice = createSlice({
  name: "page",

  initialState,

  reducers: {
    setSelectedPage(state, action: PayloadAction<Page | null>) {
      state.selectedPage = action.payload;
    },

    setSearchFilter(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
    },

    setStatusFilter(
      state,
      action: PayloadAction<"all" | "draft" | "published">
    ) {
      state.filters.status = action.payload;
    },

    clearFilters(state) {
      state.filters = {
        search: "",
        status: "all",
      };
    },

    clearPageError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder

      /* FETCH */

      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })

      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Unable to fetch pages";
      })

      /* CREATE */

      .addCase(createPage.fulfilled, (state, action) => {
        state.pages.unshift(action.payload);
      })

      /* UPDATE */

      .addCase(updatePage.fulfilled, (state, action) => {
        const index = state.pages.findIndex(
          (page) => page.id === action.payload.id
        );

        if (index !== -1) {
          state.pages[index] = action.payload;
        }
      })

      /* DELETE */

      .addCase(deletePage.fulfilled, (state, action) => {
        state.pages = state.pages.filter(
          (page) => page.id !== action.payload
        );
      })

      /* PUBLISH */

      .addCase(publishPage.fulfilled, (state, action) => {
        const index = state.pages.findIndex(
          (page) => page.id === action.payload.id
        );

        if (index !== -1) {
          state.pages[index] = action.payload;
        }
      });
  },
});

export const {
  setSelectedPage,
  setSearchFilter,
  setStatusFilter,
  clearFilters,
  clearPageError,
} = pageSlice.actions;

export default pageSlice.reducer;