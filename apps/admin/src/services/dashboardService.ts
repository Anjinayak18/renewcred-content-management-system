import api from "@/lib/axios";

const dashboardService = {
  async getDashboard() {
    const response = await api.get("/dashboard");
    return response.data;
  },
};

export default dashboardService;