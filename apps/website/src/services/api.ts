import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse
} from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request.");
    }

    if (error.response?.status === 404) {
      console.error("Requested resource not found.");
    }

    if (error.response?.status === 500) {
      console.error("Internal server error.");
    }

    return Promise.reject(error);
  }
);

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: string;
  author?: string;
  publishedAt?: string;
}

export interface MediaFile {
  id: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
}

const apiService = {
  async getPages() {
    const response =
      await api.get<CmsPage[]>("/pages");

    return response.data;
  },

  async getPublishedPages() {
    const response =
      await api.get<CmsPage[]>(
        "/pages?status=published"
      );

    return response.data;
  },

  async getPageBySlug(
    slug: string
  ) {
    const response =
      await api.get<CmsPage>(
        `/pages/${slug}`
      );

    return response.data;
  },

  async getMedia() {
    const response =
      await api.get<MediaFile[]>(
        "/media"
      );

    return response.data;
  }
};

export { api };

export default apiService;