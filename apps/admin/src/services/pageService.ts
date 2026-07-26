import api from "@/lib/axios";

export interface PagePayload {
  title: string;
  slug: string;
  content: string;
  status: "draft" | "published";
}

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

class PageService {
  async getPages(): Promise<Page[]> {
    try {
      const response = await api.get("/pages");

      return response.data.data.map((page: any) => ({
        id: page._id,
        title: page.title,
        slug: page.slug,
        content:
          typeof page.content === "string"
            ? page.content
            : page.content?.[0]?.content ?? "",
        status:
          page.status === "PUBLISHED"
            ? "published"
            : "draft",
        author: page.author?._id || "",
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to fetch pages", error);
      throw error;
    }
  }

  async createPage(data: PagePayload) {
  const payload = {
    title: data.title,
    slug: data.slug,
    status:
      data.status === "published"
        ? "PUBLISHED"
        : "DRAFT",

    description: "",

    content: [
      {
        type: "paragraph",
        content: data.content,
        order: 1,
      },
    ],

    seo: {
      metaTitle: data.title,
      metaDescription: "",
      keywords: [],
    },

    featuredImage: "",
  };

  console.log("SENDING PAYLOAD");
  console.log(payload);

  const response = await api.post(
    "/pages",
    payload
  );

  return response.data;
}

  async updatePage(id: string, data: PagePayload) {
  const payload = {
    title: data.title,
    slug: data.slug,
    status:
      data.status === "published"
        ? "PUBLISHED"
        : "DRAFT",

    description: "",

    content: [
      {
        type: "paragraph",
        content: data.content,
        order: 1,
      },
    ],

    seo: {
      metaTitle: data.title,
      metaDescription: "",
      keywords: [],
    },

    featuredImage: "",
  };

  const response = await api.put(
    `/pages/${id}`,
    payload
  );

  return response.data;
}
  async publishPage(id: string) {
  const response = await api.patch(`/pages/${id}/publish`);
  return response.data;
}

async deletePage(id: string) {
  const response = await api.delete(`/pages/${id}`);
  return response.data;
}
}

export default new PageService();