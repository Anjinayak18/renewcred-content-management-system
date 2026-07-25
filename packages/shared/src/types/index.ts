import { PAGE_STATUS, USER_ROLES } from "../constants";

/**
 * Generic API Types
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

/**
 * Authentication
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: User;
}

/**
 * User
 */
export type UserRole =
  (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Pages
 */
export type PageStatus =
  (typeof PAGE_STATUS)[keyof typeof PAGE_STATUS];

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: PageStatus;
  authorId?: string;
  authorName?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Media
 */
export interface MediaFile {
  id: string;
  originalName: string;
  fileName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedBy?: string;
  createdAt?: string;
}

/**
 * Dashboard
 */
export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalUsers: number;
  totalMedia: number;
}

/**
 * Contact Form
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Navigation
 */
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

/**
 * SEO
 */
export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

/**
 * Theme
 */
export type ThemeMode =
  | "light"
  | "dark"
  | "system";