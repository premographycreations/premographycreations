// s3.js
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = import.meta.env.VITE_AWS_REGION || "us-east-1";
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME || "premographycreations";

// // -------------------------------
// // S3 CLIENT
// // -------------------------------
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

// // -------------------------------
// // Helper to format section names (engagement → Engagement)
// // -------------------------------
function formatSectionName(section) {
  return section.charAt(0).toUpperCase() + section.slice(1);
}

// -------------------------------
// Utility: list immediate subfolders inside a prefix
// -------------------------------
export async function listFolders(prefix) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`,
      Delimiter: "/", // ensures only immediate children are returned
    });

    const response = await s3.send(command);
    const base = prefix.endsWith("/") ? prefix : `${prefix}/`;

    return (
      response.CommonPrefixes?.map((p) =>
        p.Prefix.replace(base, "").replace(/\/$/, "")
      ) || []
    );
  } catch (error) {
    console.error("Error listing folders:", error);
    return [];
  }
}

// // -------------------------------
// // Utility: list files inside a prefix and return presigned URLs
// // -------------------------------
export async function listFilesByExtensions(prefix, extensions) {
  try {
    const exts = extensions.map((e) => e.toLowerCase());
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`,
    });

    const response = await s3.send(command);
    const contents = response.Contents || [];

    const urls = await Promise.all(
      contents
        .filter((obj) => {
          if (obj.Key.endsWith("/")) return false;
          const lower = obj.Key.toLowerCase();
          return exts.some((ext) => lower.endsWith(ext));
        })
        .map(async (obj) =>
          getSignedUrl(
            s3,
            new GetObjectCommand({ Bucket: BUCKET_NAME, Key: obj.Key }),
            { expiresIn: 3600 } 
          )
        )
    );

    return urls;
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

// // -------------------------------
// // Public APIs for your app
// // -------------------------------

// Base URL for API
const API_BASE = 'http://localhost:3001/api';

// List Portfolio Top Folders
export async function listPortfolioTopFolders() {
  try {
    const response = await fetch(`${API_BASE}/listPortfolioTopFolders`);
    if (!response.ok) throw new Error('Failed to fetch portfolio folders');
    return await response.json();
  } catch (error) {
    console.error('Error listing top-level Portfolio folders:', error);
    return [];
  }
}

// List Portfolio Section Subfolders
export const listPortfolioSectionSubfolders = async (section) => {
  try {
    const response = await fetch(`${API_BASE}/listPortfolioSectionSubfolders/${section}`);
    if (!response.ok) throw new Error('Failed to fetch section subfolders');
    return await response.json();
  } catch (error) {
    console.error('Error listing portfolio section subfolders:', error);
    return [];
  }
};

// Get Folder Cover Images
export const getFolderCoverImages = async (section) => {
  try {
    const response = await fetch(`${API_BASE}/getFolderCoverImages/${section}`);
    if (!response.ok) throw new Error('Failed to fetch cover images');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cover images:', error);
    return null;
  }
};

// Get Subfolder Cover Images
export const getSubFolderCoverImages = async (section, subfolder) => {
  try {
    const response = await fetch(`${API_BASE}/getSubFolderCoverImages/${section}/${encodeURIComponent(subfolder)}`);
    if (!response.ok) throw new Error('Failed to fetch subfolder cover images');
    return await response.json();
  } catch (error) {
    console.error('Error fetching subfolder cover images:', error);
    return null;
  }
};

// List Photos in Subfolder
export const listPhotoInSubfolder = async (section, subfolder) => {
  try {
    const response = await fetch(`${API_BASE}/listPhotoInSubfolder/${section}/${encodeURIComponent(subfolder)}`);
    if (!response.ok) throw new Error('Failed to fetch photos');
    return await response.json();
  } catch (error) {
    console.error('Error listing photos in subfolder:', error);
    return [];
  }
};

// Get Video Links of Portfolio
export const getVideoLinksOfPortfolio = async (serviceName, folderName) => {
  try {
    const response = await fetch(`${API_BASE}/getVideoLinksOfPortfolio/${serviceName}/${folderName}`);
    if (!response.ok) throw new Error('Failed to fetch video links');
    return await response.json();
  } catch (error) {
    console.error('Error fetching video links:', error);
    return [];
  }
};

// Get Video Links From S3
export const getVideoLinksFromS3 = async (serviceName, folderName) => {
  try {
    const response = await fetch(`${API_BASE}/getVideoLinksFromS3/${serviceName}/${folderName}`);
    if (!response.ok) throw new Error('Failed to fetch video links');
    return await response.json();
  } catch (error) {
    console.error('Error fetching video links:', error);
    return [];
  }
};

// Get Photoshoot Subfolder Cover Images
export async function getPhotoshootSubFolderCoverImages(category, folder) {
  try {
    const response = await fetch(`${API_BASE}/getPhotoshootSubFolderCoverImages/${category}/${folder}`);
    if (!response.ok) throw new Error('Failed to fetch cover images');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching cover for ${folder}:`, error);
    return null;
  }
}

// List Service Subfolders
export const listServiceSubfolders = async (serviceName) => {
  try {
    const response = await fetch(`${API_BASE}/listServiceSubfolders/${encodeURIComponent(serviceName)}`);
    if (!response.ok) throw new Error('Failed to fetch service subfolders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching service subfolders:', error);
    return [];
  }
};

// Get Folder Cover Image
export const getFolderCoverImage = async (serviceName, folderName) => {
  try {
    const response = await fetch(`${API_BASE}/getFolderCoverImage/${serviceName}/${folderName}`);
    if (!response.ok) throw new Error('Failed to fetch cover image');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cover image:', error);
    return null;
  }
};

// Get Video Links
export const getVideoLinks = async (serviceName, folderName) => {
  try {
    const response = await fetch(`${API_BASE}/getVideoLinks/${serviceName}/${folderName}`);
    if (!response.ok) throw new Error('Failed to fetch video links');
    return await response.json();
  } catch (error) {
    console.error('Error fetching video links:', error);
    return [];
  }
};

// List Photoshoot Media
export const listPhotoshootMedia = async (categoryName, subfolder = null) => {
  try {
    const url = subfolder
      ? `${API_BASE}/listPhotoshootMedia/${categoryName}/${subfolder}`
      : `${API_BASE}/listPhotoshootMedia/${categoryName}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch photoshoot media');
    return await response.json();
  } catch (error) {
    console.error('Error fetching photoshoot media:', error);
    return [];
  }
};

