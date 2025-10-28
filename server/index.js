const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const REGION = process.env.VITE_AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.VITE_AWS_BUCKET_NAME || 'premographycreations';

const s3 = new AWS.S3({
  region: REGION,
  accessKeyId: process.env.VITE_AWS_ACCESS_KEY,
  secretAccessKey: process.env.VITE_AWS_SECRET_KEY,
});

// Helper function
function formatSectionName(section) {
  return section.charAt(0).toUpperCase() + section.slice(1);
}

// List Portfolio Top Folders
app.get('/api/listPortfolioTopFolders', async (req, res) => {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: 'Portfolios/',
      Delimiter: '/'
    };
    const response = await s3.listObjectsV2(params).promise();
    const folders = response.CommonPrefixes?.map(p => 
      p.Prefix.replace('Portfolios/', '').replace(/\/$/, '')
    ) || [];
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Portfolio Section Subfolders
app.get('/api/listPortfolioSectionSubfolders/:section', async (req, res) => {
  try {
    const fixedSection = formatSectionName(req.params.section);
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: `Portfolios/${fixedSection}/`,
      Delimiter: '/'
    };
    const response = await s3.listObjectsV2(params).promise();
    const folders = (response.CommonPrefixes || [])
      .map(p => p.Prefix.split('/').slice(-2, -1)[0])
      .filter(f => f.toLowerCase() !== 'album' && f.toLowerCase() !== 'coverimage');
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Folder Cover Images
app.get('/api/getFolderCoverImages/:section', async (req, res) => {
  try {
    const { section, subfolder } = req.params;
    const fixedSection = formatSectionName(section);
    // const decodedSubfolder = decodeURIComponent(subfolder);

    // if (decodedSubfolder.toLowerCase() === 'album') {
    //   return res.json(null);
    // }

    const prefix = `Portfolios/${fixedSection}/CoverImage/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp|gif|heic|avif)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files.length > 0 ? files[0] : null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Subfolder Cover Images
app.get('/api/getSubFolderCoverImages/:section/:subfolder', async (req, res) => {
  try {
    const { section, subfolder } = req.params;
    const fixedSection = formatSectionName(section);
    const decodedSubfolder = decodeURIComponent(subfolder);

    if (decodedSubfolder.toLowerCase() === 'album') {
      return res.json(null);
    }

    const prefix = `Portfolios/${fixedSection}/${decodedSubfolder}/CoverImage/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp|gif|heic|avif)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files.length > 0 ? files[0] : null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Photos in Subfolder
app.get('/api/listPhotoInSubfolder/:section/:subfolder', async (req, res) => {
  try {
    const { section, subfolder } = req.params;
    const fixedSection = formatSectionName(section);
    const decodedSubfolder = decodeURIComponent(subfolder);

    if (decodedSubfolder.toLowerCase() === 'album') {
      return res.json([]);
    }

    const prefix = `Portfolios/${fixedSection}/${decodedSubfolder}/Images/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp|gif|heic|avif)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Video Links of Portfolio
app.get('/api/getVideoLinksOfPortfolio/:serviceName/:folderName', async (req, res) => {
  try {
    const { serviceName, folderName } = req.params;
    const prefix = `Portfolios/${serviceName}/${folderName}/Videos/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const textFiles = await Promise.all(
      (response.Contents || [])
        .filter(obj => obj.Key.endsWith('.txt'))
        .map(async obj => {
          const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: obj.Key
          }).promise();
          return data.Body.toString('utf-8');
        })
    );

    const links = textFiles
      .map(content => content.trim())
      .filter(url => url.includes('youtube.com') || url.includes('youtu.be'));

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Video Links From S3
app.get('/api/getVideoLinksFromS3/:serviceName/:folderName', async (req, res) => {
  try {
    const { serviceName, folderName } = req.params;
    const prefix = `Photoshoot/${serviceName}/${folderName}/Videos/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const textFiles = await Promise.all(
      (response.Contents || [])
        .filter(obj => obj.Key.endsWith('.txt'))
        .map(async obj => {
          const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: obj.Key
          }).promise();
          return data.Body.toString('utf-8');
        })
    );

    const links = textFiles
      .map(content => content.trim())
      .filter(url => url.includes('youtube.com') || url.includes('youtu.be'));

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Photoshoot Subfolder Cover Images
app.get('/api/getPhotoshootSubFolderCoverImages/:category/:folder', async (req, res) => {
  try {
    const { category, folder } = req.params;
    const prefix = `Photoshoot/${category}/${folder}/CoverImage/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files.length > 0 ? files[0] : null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Service Subfolders
app.get('/api/listServiceSubfolders/:serviceName', async (req, res) => {
  try {
    const fixedService = decodeURIComponent(req.params.serviceName).replace(/\s+/g, '-');
    const prefix = `Services/${fixedService}/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix,
      Delimiter: '/'
    };

    const response = await s3.listObjectsV2(params).promise();
    const folders = (response.CommonPrefixes || [])
      .map(p => p.Prefix.split('/').slice(-2, -1)[0]);

    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Folder Cover Image
app.get('/api/getFolderCoverImage/:serviceName/:folderName', async (req, res) => {
  try {
    const { serviceName, folderName } = req.params;
    const prefix = `Services/${serviceName}/${folderName}/CoverImage/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp|gif)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files.length > 0 ? files[0] : null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Video Links
app.get('/api/getVideoLinks/:serviceName/:folderName', async (req, res) => {
  try {
    const { serviceName, folderName } = req.params;
    const prefix = `Services/${serviceName}/${folderName}/Videos/`;
    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const textFiles = await Promise.all(
      (response.Contents || [])
        .filter(obj => obj.Key.endsWith('.txt'))
        .map(async obj => {
          const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: obj.Key
          }).promise();
          return data.Body.toString('utf-8');
        })
    );

    const links = textFiles
      .map(content => content.trim())
      .filter(url => url.includes('youtube.com') || url.includes('youtu.be'));

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Photoshoot Media (without subfolder)
app.get('/api/listPhotoshootMedia/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const fixedCategory = decodeURIComponent(categoryName).replace(/\s+/g, '-');

    if (fixedCategory.toLowerCase() === 'events') {
      const params = {
        Bucket: BUCKET_NAME,
        Prefix: 'Photoshoot/Events/',
        Delimiter: '/'
      };
      const response = await s3.listObjectsV2(params).promise();
      const folders = (response.CommonPrefixes || [])
        .map(p => p.Prefix.split('/').slice(-2, -1)[0]);
      return res.json(folders);
    } else {
      const prefix = `Photoshoot/${fixedCategory}/`;
      const params = {
        Bucket: BUCKET_NAME,
        Prefix: prefix
      };

      const response = await s3.listObjectsV2(params).promise();
      const files = await Promise.all(
        (response.Contents || [])
          .filter(obj => /\.(jpg|jpeg|png|webp|gif|heic|avif|mp4|mov|m4v|avi|mkv|webm)$/i.test(obj.Key))
          .map(obj => s3.getSignedUrl('getObject', {
            Bucket: BUCKET_NAME,
            Key: obj.Key,
            Expires: 3600
          }))
      );

      res.json(files);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Photoshoot Media (with subfolder)
app.get('/api/listPhotoshootMedia/:categoryName/:subfolder', async (req, res) => {
  try {
    const { categoryName, subfolder } = req.params;
    const fixedCategory = decodeURIComponent(categoryName).replace(/\s+/g, '-');

    let prefix = '';
    if (fixedCategory.toLowerCase() === 'events') {
      prefix = `Photoshoot/Events/${decodeURIComponent(subfolder)}/`;
    } else {
      prefix = `Photoshoot/${fixedCategory}/`;
    }

    const params = {
      Bucket: BUCKET_NAME,
      Prefix: prefix
    };

    const response = await s3.listObjectsV2(params).promise();
    const files = await Promise.all(
      (response.Contents || [])
        .filter(obj => /\.(jpg|jpeg|png|webp|gif|heic|avif|mp4|mov|m4v|avi|mkv|webm)$/i.test(obj.Key))
        .map(obj => s3.getSignedUrl('getObject', {
          Bucket: BUCKET_NAME,
          Key: obj.Key,
          Expires: 3600
        }))
    );

    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});