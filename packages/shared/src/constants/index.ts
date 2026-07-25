/**
 * Application
 */
export const APP_NAME = "CMS Assignment";

export const APP_VERSION = "1.0.0";

/**
 * API
 */
export const API_BASE_PATH = "/api";

export const DEFAULT_API_TIMEOUT = 10000;

/**
 * Pagination
 */
export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = 10;

export const MAX_PAGE_SIZE = 100;

/**
 * Authentication
 */
export const ACCESS_TOKEN_KEY = "accessToken";

export const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  AUTHOR: "author"
} as const;

/**
 * Page Status
 */
export const PAGE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived"
} as const;

/**
 * Media
 */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif"
] as const;

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * Theme
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system"
} as const;

/**
 * Routes
 */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  PAGES: "/pages",
  MEDIA: "/media",
  USERS: "/users",
  ABOUT: "/about",
  CONTACT: "/contact"
} as const;

/**
 * HTTP Status Codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

/**
 * Regular Expressions
 */
export const REGEX = {
  EMAIL:
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  SLUG:
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/
} as const;