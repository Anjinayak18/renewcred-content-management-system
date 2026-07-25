import {
  HydratedDocument,
  Model,
  Schema,
  Types,
  model,
} from "mongoose";

export enum PageStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface IContentBlock {
  type: string;
  content: string;
  order: number;
}

export interface ISeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface IPage {
  title: string;
  slug: string;
  description?: string;

  content: IContentBlock[];

  seo: ISeo;

  status: PageStatus;

  featuredImage?: string;

  author: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export interface IPageMethods {}

export type PageDocument = HydratedDocument<
  IPage,
  IPageMethods
>;

export interface PageModel
  extends Model<IPage, object, IPageMethods> {}

const ContentBlockSchema = new Schema<IContentBlock>(
  {
    type: {
      type: String,
      required: true,
      trim: true,
      default: "text",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const SeoSchema = new Schema<ISeo>(
  {
    metaTitle: {
      type: String,
      default: "",
    },

    metaDescription: {
      type: String,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const PageSchema = new Schema<
  IPage,
  PageModel,
  IPageMethods
>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    content: {
      type: [ContentBlockSchema],
      required: true,
      default: [],
    },

    seo: {
      type: SeoSchema,
      default: () => ({
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      }),
    },

    status: {
      type: String,
      enum: Object.values(PageStatus),
      default: PageStatus.DRAFT,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PageSchema.index({
  title: "text",
  slug: "text",
  description: "text",
});

PageSchema.index({
  slug: 1,
});

const Page =
  (globalThis as any).PageModel ||
  model<IPage, PageModel>("Page", PageSchema);

(globalThis as any).PageModel = Page;

export default Page;