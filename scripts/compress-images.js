import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images/tanzania');

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return;
  }

  const tempFilePath = filePath + '.tmp';
  const statsBefore = fs.statSync(filePath);
  const sizeBeforeMB = (statsBefore.size / (1024 * 1024)).toFixed(2);

  try {
    let pipeline = sharp(filePath)
      .resize({
        width: 1920,
        height: 1920,
        fit: 'inside',
        withoutEnlargement: true
      });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    }

    await pipeline.toFile(tempFilePath);

    const statsAfter = fs.statSync(tempFilePath);
    const sizeAfterKB = (statsAfter.size / 1024).toFixed(2);

    if (statsAfter.size < statsBefore.size) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempFilePath, filePath);
      console.log(`Compressed ${path.basename(filePath)}: ${sizeBeforeMB}MB -> ${sizeAfterKB}KB`);
    } else {
      fs.unlinkSync(tempFilePath);
      console.log(`Skipped ${path.basename(filePath)} (compression didn't reduce size)`);
    }
  } catch (err) {
    console.error(`Error compressing ${path.basename(filePath)}:`, err.message);
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    return;
  }

  console.log('Starting local image compression using sharp...');
  const files = fs.readdirSync(IMAGES_DIR);
  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    await compressImage(filePath);
  }
  console.log('Finished image compression!');
}

main();
