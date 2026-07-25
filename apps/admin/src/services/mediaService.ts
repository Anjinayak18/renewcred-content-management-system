import api from "@/lib/axios";

// Backend serves uploaded files as relative paths (e.g. "/uploads/foo.png").
// Resolve them against the API's origin (not the Next.js dev server) so
// <img> tags actually point at the backend.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api/v1";

const API_ORIGIN = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

export const resolveMediaUrl = (url: string): string =>
  url.startsWith("http") ? url : `${API_ORIGIN}${url}`;

const mediaService = {
  async getFiles() {
    const res = await api.get("/media");
    return res.data;
  },

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    // Override the instance's default "application/json" header with
    // undefined so the browser sets "multipart/form-data" itself, including
    // the required boundary — hardcoding the string here would break multer.
    const res = await api.post("/media/upload", formData, {
      headers: {
        "Content-Type": undefined
      }
    });

    return res.data;
  },

  async deleteFile(fileName: string) {
    const res = await api.delete(`/media/${fileName}`);
    return res.data;
  }
};

export default mediaService;
