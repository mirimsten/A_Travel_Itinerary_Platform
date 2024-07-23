// // import multer from 'multer';
// // import path from 'path';
// // import fs from 'fs';

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadDir = path.join('uploads');
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   }
// // });

// // const fileFilter = (req, file, cb) => {
// //     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
// //       cb(null, true);
// //     } else {
// //       cb(new Error('Only image and video files are allowed!'), false);
// //     }
// //   };

// // export const upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter
// // }).fields([{ name: 'photos', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);



// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadDir = path.join('uploads');
// //     if (!fs.existsSync(uploadDir)) {
// //       fs.mkdirSync(uploadDir, { recursive: true });
// //     }
// //     console.log(`Uploading file to ${uploadDir}`);
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueName = Date.now() + path.extname(file.originalname);
// //     console.log(`Saving file as ${uniqueName}`);
// //     cb(null, uniqueName);
// //   }
// // });
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'uploads')); // תיקייה אחת בלבד
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image and video files are allowed!'), false);
//   }
// };

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// }).fields([{ name: 'photos', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);






import multer from 'multer';
import path from 'path';
import fs from 'fs';

// הגדרת אחסון
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        console.error('Error creating upload directory:', err);
        return cb(err, null);
      }
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


// סינון קבצים
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

// הגדרת multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([{ name: 'photos', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);
