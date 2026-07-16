import type { MediaCategory } from "@/types";
import { saveMediaMetadataAction } from "@/actions/media";

async function resizeImage(
  file: File,
  maxWidth: number = 1920,
  quality: number = 0.85
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context failed"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Blob creation failed"));
        },
        file.type,
        quality
      );
    };

    img.onerror = () => reject(new Error("Image load failed"));
    reader.readAsDataURL(file);
  });
}

function getImageDimensions(file: File | Blob): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => reject(new Error("Image load failed"));
    reader.readAsDataURL(file);
  });
}

function getFileType(mimeType: string): "image" | "document" | "video" | "other" {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("sheet") ||
    mimeType.includes("presentation")
  ) {
    return "document";
  }
  return "other";
}

function generateFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const parts = originalName.split(".");
  const extension = parts.pop();
  const cleanName = parts.join(".").toLowerCase().replace(/[^a-z0-9]/g, "-").substring(0, 30);
  return `${cleanName}-${timestamp}-${random}.${extension}`;
}

export async function uploadFile(
  file: File,
  category: MediaCategory,
  alt: string,
  onProgress?: (progress: number) => void
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const fileType = getFileType(file.type);
    let uploadFile: File | Blob = file;
    let dimensions: { width?: number; height?: number } = {};

    if (fileType === "image") {
      uploadFile = await resizeImage(file);
      dimensions = await getImageDimensions(uploadFile);
    }

    const filename = generateFilename(file.name);
    
    onProgress?.(10);

    const formData = new FormData();
    formData.append("file", uploadFile, filename);

    onProgress?.(30);

    const { uploadToCloudinaryAction } = await import("@/actions/cloudinary");
    const uploadRes = await uploadToCloudinaryAction(formData, category);

    if (!uploadRes.success || !uploadRes.url || !uploadRes.publicId) {
      return { success: false, error: uploadRes.error || "Cloudinary upload failed" };
    }

    onProgress?.(80);

    const result = await saveMediaMetadataAction({
      filename,
      originalName: file.name,
      url: uploadRes.url,
      type: fileType,
      category,
      mimeType: file.type,
      size: uploadFile.size,
      width: dimensions.width,
      height: dimensions.height,
      alt,
      storagePath: uploadRes.publicId,
    });

    onProgress?.(100);

    if (result.success) {
      return { success: true, url: uploadRes.url };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
