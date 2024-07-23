import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads', req.body.fileType);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{ name: 'photos', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);

// router.post('/', upload, (req, res) => {
//   res.send('Files uploaded successfully');
// });


// // שינוי בפונקציה שמבצעת העלאת קבצים
// router.post('/', upload, (req, res) => {
//     const uploadedFiles = [];
//     if (req.files.photos) {
//       req.files.photos.forEach(photo => uploadedFiles.push(`photos/${photo.filename}`));
//     }
//     if (req.files.videos) {
//       req.files.videos.forEach(video => uploadedFiles.push(`videos/${video.filename}`));
//     }
//     res.json({ uploadedFiles });
//   });

router.post('/', upload, (req, res) => {
    const uploadedFiles = {
      photos: req.files.photos ? req.files.photos.map(file => file.filename) : [],
      videos: req.files.videos ? req.files.videos.map(file => file.filename) : []
    };
    res.json(uploadedFiles); // שורה ששונתה
  });

router.delete('/:fileType/:fileName', (req, res) => {
  const { fileType, fileName } = req.params;
  const filePath = path.join(__dirname, 'uploads', fileType, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).send('Error deleting file');
    }
    res.send('File deleted successfully');
  });
});

export default router;

