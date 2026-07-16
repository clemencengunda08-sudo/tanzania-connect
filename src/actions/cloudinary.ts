"use server";

import { v2 as cloudinary } from "cloudinary";

function getCloudinarySecret(): string {
  const url = process.env.CLOUDINARY_URL;
  if (!url) return "";
  const match = url.match(/cloudinary:\/\/.*?:(.*?)@/);
  return match ? match[1] : "";
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: getCloudinarySecret() || process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinaryAction(
  formData: FormData,
  category: string
): Promise<{ success: boolean; url?: string; publicId?: string; error?: string }> {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const originalName = file.name;
    const cleanName = originalName.split(".")[0];

    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `tanzania_connect/${category}`,
          public_id: cleanName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            resolve({ success: false, error: error.message });
          } else if (result) {
            resolve({
              success: true,
              url: result.secure_url,
              publicId: result.public_id,
            });
          } else {
            resolve({ success: false, error: "Upload failed with no response" });
          }
        }
      ).end(buffer);
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteFromCloudinaryAction(
  publicId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          resolve({ success: false, error: error.message });
        } else {
          resolve({ success: true });
        }
      });
    });
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
