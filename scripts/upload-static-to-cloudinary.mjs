import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images/tanzania');
const SRC_DIR = path.join(__dirname, '../src');

function getCloudinarySecret() {
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

function getFilesRecursively(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, extensions));
    } else {
      const ext = path.extname(filePath).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

async function uploadToCloudinary(filePath, filename) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: 'tanzania_connect/static',
        public_id: filename.split('.')[0],
        resource_type: 'image',
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
  });
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    return;
  }

  console.log('Reading static images...');
  const files = fs.readdirSync(IMAGES_DIR);
  const mapping = {};

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) continue;

    console.log(`Uploading ${file} to Cloudinary...`);
    try {
      const cloudinaryUrl = await uploadToCloudinary(filePath, file);
      const localPath = `/images/tanzania/${file}`;
      mapping[localPath] = cloudinaryUrl;
      console.log(`Uploaded ${file} -> ${cloudinaryUrl}`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.message);
    }
  }

  const mapFilePath = path.join(__dirname, 'cloudinary-static-map.json');
  fs.writeFileSync(mapFilePath, JSON.stringify(mapping, null, 2));
  console.log(`Saved mapping to ${mapFilePath}`);

  console.log('Finding files in src/ to perform replacements...');
  const srcFiles = getFilesRecursively(SRC_DIR, ['.ts', '.tsx', '.json', '.md']);
  
  let totalReplacements = 0;
  for (const file of srcFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanged = false;

    for (const [localPath, cloudinaryUrl] of Object.entries(mapping)) {
      if (content.includes(localPath)) {
        const regex = new RegExp(localPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
        content = content.replace(regex, cloudinaryUrl);
        hasChanged = true;
        totalReplacements++;
      }
    }

    if (hasChanged) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated references in: ${path.basename(file)}`);
    }
  }

  console.log(`Completed replacements! Total fields updated: ${totalReplacements}`);
}

main().catch(console.error);
