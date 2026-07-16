import type { Timestamp } from "firebase/firestore";

// ─────────────────────────────────────────────────────
// FIRESTORE MODELS
// ─────────────────────────────────────────────────────

export type AdminRole = "owner" | "admin" | "editor" | "viewer";

export interface AdminUser {
  uid: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt?: Timestamp;
}

export interface AdminUserDoc {
  role: AdminRole;
  active: boolean;
  email: string;
}

export interface Sector {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: "published" | "draft" | "archived";
  order: number;
  lastUpdated: Timestamp | null;
  updatedBy?: string;
  createdAt?: Timestamp;
  viewCount?: number;
  aiGenerated?: boolean;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: "published" | "draft" | "archived";
  lastUpdated: Timestamp | null;
  updatedBy?: string;
  createdAt?: Timestamp;
}

export interface SiteSettings {
  id: string;
  n8nWebhookUrl?: string;
  autoSyncN8N?: boolean;
  heroMottoPrefix?: string;
  heroSubtext?: string;
  phrases?: string[];
  maintenanceMode?: boolean;
}

// ─────────────────────────────────────────────────────
// DOWNLOADS TYPES
// ─────────────────────────────────────────────────────

export type DownloadCategory =
  | "legal-documents"
  | "application-forms"
  | "investment-guides"
  | "tax-forms"
  | "permit-templates"
  | "policy-documents"
  | "research-reports"
  | "checklists";

export type DownloadFormat =
  | "pdf"
  | "docx"
  | "xlsx"
  | "pptx"
  | "zip"
  | "image";

export interface Download {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  format: DownloadFormat;
  fileSize: number;        // in bytes
  fileUrl: string;          // Firebase Storage URL
  thumbnailUrl?: string;
  language: "en" | "sw" | "both";
  tags: string[];
  featured: boolean;
  requiresAuth: boolean;
  downloadCount: number;
  uploadedAt: Timestamp | null;
  lastUpdated: Timestamp | null;
  uploadedBy: string;
  status: "active" | "archived";
}

// ─────────────────────────────────────────────────────
// MEDIA TYPES
// ─────────────────────────────────────────────────────

export type MediaType =
  | "image"
  | "document"
  | "video"
  | "other";

export type MediaCategory =
  | "sectors"
  | "guides"
  | "downloads"
  | "branding"
  | "general";

export interface MediaFile {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  type: MediaType;
  category: MediaCategory;
  mimeType: string;
  size: number;              // bytes
  width?: number;
  height?: number;
  alt: string;
  description?: string;
  tags: string[];
  usedIn: string[];          // sector/guide IDs
  uploadedAt: Timestamp | null;
  uploadedBy: string;
  storagePath: string;
}

export interface UploadProgress {
  file: File;
  progress: number;
  status: "uploading" | "success" | "error";
  url?: string;
  error?: string;
}

// ─────────────────────────────────────────────────────
// AUTH & API TYPES
// ─────────────────────────────────────────────────────

export interface GenerateSectorInput {
  sectorName: string;
}

export interface GenerateSectorOutput {
  title: string;
  description: string;
}

export interface SectorPageDoc {
  id?: string;
  title: string;
  description: string;
}

export interface SiteConfigDoc {
  phrases?: string[];
  heroMottoPrefix?: string;
  heroSubtext?: string;
  n8nWebhookUrl?: string;
  autoSyncN8N?: boolean;
  queryLogging?: boolean;
  highPrecisionMode?: boolean;
  maintenanceMode?: boolean;
}
