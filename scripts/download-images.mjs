import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images/tanzania');

const imageList = [
  { id: 'serengeti-safari', file: 'Lion in serengeti national park.jpg' },
  { id: 'mount-kilimanjaro', file: 'Mount Kilimanjaro Dec 2009.jpg' },
  { id: 'zanzibar-beach', file: 'White sandy beach at Nungwi, Zanzibar.jpg' },
  { id: 'dar-es-salaam', file: 'DarEsSalaam-Skyline.jpg' },
  { id: 'agriculture-tanzania', file: 'LUPONDE tea farm Tanzania.jpg' },
  { id: 'arusha-town', file: 'Acacia tree sky.jpg' },
  { id: 'ngorongoro-crater', file: 'Ngorongoro Crater.jpg' },
  { id: 'mafia-island', file: 'Mafia Island, Tanzania.jpg' },
  { id: 'serengeti-migration', file: 'Serengeti wildebeest migration JF.jpg' },
  { id: 'safari-elephant', file: 'African Bush Elephant.jpg' },
  { id: 'giraffe-tarangire', file: 'Young Maasai Giraffes.jpg' },
  { id: 'safari-camp', file: 'Serengeti camp Lobo JF.jpg' },
  { id: 'zanzibar-rooftop', file: 'Stone Town, Zanzibar.jpg' },
  { id: 'transport-banner', file: 'TAZARA Dar es Salaam Station.jpg' },
  { id: 'infrastructure-banner', file: 'Nyerere Bridge - Kigamboni .jpg' },
  { id: 'healthcare-banner', file: 'Mloganzila.jpg' },
  { id: 'housing-banner', file: 'Colonial-Era Facade with Apartment Building Backdrop - Dar es Salaam - Tanzania.jpg' },
  { id: 'culture-banner', file: 'Ngorongoro,_Tanzania_-_Maasai_people.jpg' },
  { id: 'banking', file: 'Bank of Tanzania before dusk.jpg' },
  { id: 'corporate', file: 'Dar es Salaam Panorama.jpg' }
];

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Helper to make a JSON get request
function getJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'TanzaniaConnectClient/1.0 (expert@tanzaniareach.com)'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Fetch direct image URL using Wikimedia Commons API
async function fetchImageUrl(filename) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  const response = await getJson(apiUrl);
  const pages = response.query?.pages;
  if (!pages) return null;
  const pageId = Object.keys(pages)[0];
  if (pageId === '-1') return null;
  return pages[pageId].imageinfo?.[0]?.url || null;
}

function downloadImage(url, destId, index) {
  return new Promise((resolve, reject) => {
    const dest = path.join(IMAGES_DIR, `${destId}.jpg`);
    console.log(`[${index + 1}/${imageList.length}] Downloading ${destId} from ${url}...`);
    
    const options = {
      headers: {
        'User-Agent': 'TanzaniaConnectClient/1.0 (expert@tanzaniareach.com)'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status Code ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully saved ${destId}.jpg`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Starting Tanzania Wikipedia images download via API...');
  for (let i = 0; i < imageList.length; i++) {
    const item = imageList[i];
    try {
      const url = await fetchImageUrl(item.file);
      if (!url) {
        console.error(`Could not resolve API URL for File:${item.file}`);
        continue;
      }
      await downloadImage(url, item.id, i);
    } catch (err) {
      console.error(`Error downloading ${item.id}:`, err.message);
    }
  }
  console.log('Finished downloading all images!');
}

main();
