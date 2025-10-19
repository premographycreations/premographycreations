// s3.js
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = import.meta.env.VITE_AWS_REGION || "us-east-1";
const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME || "premographycreations";

// -------------------------------
// S3 CLIENT
// -------------------------------
const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});

// -------------------------------
// Helper to format section names (engagement → Engagement)
// -------------------------------
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

// -------------------------------
// Utility: list files inside a prefix and return presigned URLs
// -------------------------------
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
          if (obj.Key.endsWith("/")) return false; // skip folders
          const lower = obj.Key.toLowerCase();
          return exts.some((ext) => lower.endsWith(ext));
        })
        .map(async (obj) =>
          getSignedUrl(
            s3,
            new GetObjectCommand({ Bucket: BUCKET_NAME, Key: obj.Key }),
            { expiresIn: 3600 } // 1 hour expiry
          )
        )
    );

    return urls;
  } catch (error) {
    console.error("Error listing files:", error);
    return [];
  }
}

// -------------------------------
// Public APIs for your app
// -------------------------------

// 1) Top-level folders inside Portfolios/
// 1) Top folders in Portfolios (Engagement, Wedding, Pre-wedding, etc.)
export async function listPortfolioTopFolders() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: "Portfolios/",
      Delimiter: "/",
    });

    const response = await s3.send(command);

    if (response.CommonPrefixes?.length) {
      return response.CommonPrefixes.map((p) =>
        p.Prefix.replace("Portfolios/", "").replace(/\/$/, "")
      );
    }

    return [];
  } catch (error) {
    console.error("Error listing top-level Portfolio folders:", error);
    return [];
  }
}

// 2) Subfolders inside a section (skip "Album")
export const listPortfolioSectionSubfolders = async (section) => {
  const fixedSection = formatSectionName(section);
  const all = await listFolders(`Portfolios/${fixedSection}/`);

  return all.filter(
    (f) =>
      f.toLowerCase() !== "album" &&
      f.toLowerCase() !== "coverimage"
  );
};

export const getFolderCoverImages = async (section, subfolder) => {
  const fixedSection = formatSectionName(section);
  const decodedSubfolder = decodeURIComponent(subfolder);

  // skip Album
  if (decodedSubfolder.toLowerCase() === "album") return null;

  // const prefix = `Portfolios/${fixedSection}/${decodedSubfolder}/Images/`;
  const prefix = `Portfolios/${fixedSection}/CoverImage/`;

  const files = await listFilesByExtensions(prefix, [
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif",
  ]);

  return files.length > 0 ? files[0] : null; // take the first image as cover
};
export const getSubFolderCoverImages = async (section, subfolder) => {
  const fixedSection = formatSectionName(section);
  const decodedSubfolder = decodeURIComponent(subfolder);

  // skip Album
  if (decodedSubfolder.toLowerCase() === "album") return null;

  const prefix = `Portfolios/${fixedSection}/${decodedSubfolder}/CoverImage/`;
  

  const files = await listFilesByExtensions(prefix, [
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif",
  ]);

  return files.length > 0 ? files[0] : null; // take the first image as cover
};

// 4) Photos inside subfolder (skip Album)
export const listPhotoInSubfolder = async (section, subfolder) => {
  const fixedSection = formatSectionName(section);
  const decodedSubfolder = decodeURIComponent(subfolder);

  if (decodedSubfolder.toLowerCase() === "album") return [];

  const prefix = `Portfolios/${fixedSection}/${decodedSubfolder}/Images/`;

  const files = await listFilesByExtensions(prefix, [
    ".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif",
  ]);

  return files;
};

async function getFileContent(fileUrl) {
  try {
    console.log("Fetching content from:", fileUrl);
    const response = await fetch(fileUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error("Failed to fetch file:", fileUrl, response.status);
      return null;
    }
    
    const text = await response.text();
    console.log("Fetched content length:", text.length);
    return text;
  } catch (err) {
    console.error("Error fetching file content:", fileUrl, err);
    return null;
  }
}


// 5) Videos inside subfolder (YouTube links from text files)
export const getVideoLinksOfPortfolio = async (serviceName, folderName) => {
  try {
    // Look specifically for video.txt in the Videos folder
    const prefix = `Portfolios/${serviceName}/${folderName}/Videos/`;
    const files = await listFilesByExtensions(prefix, [".txt"]);
    
    console.log("Found text files:", files);
    
    const links = [];
    for (let file of files) {
      console.log("Processing file:", file);
      const content = await getFileContent(file);
      console.log("File content:", content);
      
      if (content && content.trim()) {
        // Check if it's a valid YouTube URL
        const trimmedContent = content.trim();
        if (trimmedContent.includes("youtube.com") || trimmedContent.includes("youtu.be")) {
          links.push(trimmedContent);
        } else {
          console.log("Content doesn't contain a YouTube URL:", trimmedContent);
        }
      } else {
        console.log("Empty content or null");
      }
    }
    
    return links;
  } catch (error) {
    console.error("Error fetching video links:", error);
    return [];
  }
};
export const getVideoLinksFromS3 = async (serviceName, folderName) => {
  try {
    // Look specifically for video.txt in the Videos folder
    const prefix = `Photoshoot/${serviceName}/${folderName}/Videos/`;
    const files = await listFilesByExtensions(prefix, [".txt"]);
    
    console.log("Found text files:", files);
    
    const links = [];
    for (let file of files) {
      console.log("Processing file:", file);
      const content = await getFileContent(file);
      console.log("File content:", content);
      
      if (content && content.trim()) {
        // Check if it's a valid YouTube URL
        const trimmedContent = content.trim();
        if (trimmedContent.includes("youtube.com") || trimmedContent.includes("youtu.be")) {
          links.push(trimmedContent);
        } else {
          console.log("Content doesn't contain a YouTube URL:", trimmedContent);
        }
      } else {
        console.log("Empty content or null");
      }
    }
    
    return links;
  } catch (error) {
    console.error("Error fetching video links:", error);
    return [];
  }
};

export async function getPhotoshootSubFolderCoverImages(category, folder) {
  try {
    const prefix = `Photoshoot/${category}/${folder}/CoverImage/`; // adjust path as needed
    const files = await listFilesByExtensions(prefix, [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ]);

    console.log("Cover files for", folder, "=>", files);

    if (files.length > 0) {
      // ✅ Each file is already a signed URL string
      return files[0];
    } else {
      return null; // fallback handled in React
    }
  } catch (error) {
    console.error(`Error fetching cover for ${folder}:`, error);
    return null;
  }
}


// Fetch all images from Services/{ServiceName}/
// List subfolders inside a service (Engagement, Wedding, etc.)
export const listServiceSubfolders = async (serviceName) => {
  try {
    const fixedService = decodeURIComponent(serviceName).replace(/\s+/g, "-");
    const prefix = `Services/${fixedService}/`;

    // Get list of "folders" (subdirectories)
    const subfolders = await listFolders(prefix);
    return subfolders;
  } catch (error) {
    console.error("Error fetching service subfolders:", error);
    return [];
  }
};

// Get cover image (first image from Photos folder)
export const getFolderCoverImage = async (serviceName, folderName) => {
  try {
    const prefix = `Services/${serviceName}/${folderName}/CoverImage/`;
    const files = await listFilesByExtensions(prefix, [
      ".jpg", ".jpeg", ".png", ".webp", ".gif"
    ]);

    return files.length > 0 ? files[0] : null;
  } catch (error) {
    console.error("Error fetching cover image:", error);
    return null;
  }
};

// Get YouTube links from text files in Videos folder
export const getVideoLinks = async (serviceName, folderName) => {
  try {
    // Look specifically for video.txt in the Videos folder
    const prefix = `Services/${serviceName}/${folderName}/Videos/`;
    const files = await listFilesByExtensions(prefix, [".txt"]);
    
    console.log("Found text files:", files);
    
    const links = [];
    for (let file of files) {
      console.log("Processing file:", file);
      const content = await getFileContent(file);
      console.log("File content:", content);
      
      if (content && content.trim()) {
        // Check if it's a valid YouTube URL
        const trimmedContent = content.trim();
        if (trimmedContent.includes("youtube.com") || trimmedContent.includes("youtu.be")) {
          links.push(trimmedContent);
        } else {
          console.log("Content doesn't contain a YouTube URL:", trimmedContent);
        }
      } else {
        console.log("Empty content or null");
      }
    }
    
    return links;
  } catch (error) {
    console.error("Error fetching video links:", error);
    return [];
  }
};



// Fetch all images from Photoshoot/{Category}/
// Fetch images/videos from Photoshoot
export const listPhotoshootMedia = async (categoryName, subfolder = null) => {
  try {
    const fixedCategory = decodeURIComponent(categoryName).replace(/\s+/g, "-");

    // if Events → need to check subfolder
    let prefix = "";
    if (fixedCategory.toLowerCase() === "events") {
      if (!subfolder) {
        // return list of event subfolders
        return await listFolders(`Photoshoot/Events/`);
      } else {
        // fetch media inside specific Event (Event1, Event2)
        prefix = `Photoshoot/Events/${decodeURIComponent(subfolder)}/`;
      }
    } else {
      // Fashion or Fine-Arts
      prefix = `Photoshoot/${fixedCategory}/`;
    }

    console.log("Fetching photoshoot media from:", prefix);

    return listFilesByExtensions(prefix, [
      ".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".avif",
      ".mp4", ".mov", ".m4v", ".avi", ".mkv", ".webm"
    ]);
  } catch (error) {
    console.error("Error fetching photoshoot media:", error);
    return [];
  }
};

