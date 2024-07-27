// // import express from 'express';
// // import multer from 'multer';
// // import path from 'path';
// // import fs from 'fs';
// // import { fileURLToPath } from 'url';

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadDir = path.join(__dirname, 'uploads', req.body.fileType);
// //     if (!fs.existsSync(uploadDir)) {
// //         fs.mkdirSync(uploadDir, { recursive: true });
// //     }
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   }
// // });

// // const fileFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Only image and video files are allowed!'), false);
// //   }
// // };

// // const upload = multer({
// //   storage: storage,
// //   fileFilter: fileFilter
// // }).fields([{ name: 'photos', maxCount: 4 }, { name: 'videos', maxCount: 2 }]);

// // // router.post('/', upload, (req, res) => {
// // //   res.send('Files uploaded successfully');
// // // });


// // // // שינוי בפונקציה שמבצעת העלאת קבצים
// // // router.post('/', upload, (req, res) => {
// // //     const uploadedFiles = [];
// // //     if (req.files.photos) {
// // //       req.files.photos.forEach(photo => uploadedFiles.push(`photos/${photo.filename}`));
// // //     }
// // //     if (req.files.videos) {
// // //       req.files.videos.forEach(video => uploadedFiles.push(`videos/${video.filename}`));
// // //     }
// // //     res.json({ uploadedFiles });
// // //   });

// // router.post('/', upload, (req, res) => {
// //     const uploadedFiles = {
// //       photos: req.files.photos ? req.files.photos.map(file => file.filename) : [],
// //       videos: req.files.videos ? req.files.videos.map(file => file.filename) : []
// //     };
// //     res.json(uploadedFiles); // שורה ששונתה
// //   });

// // router.delete('/:fileType/:fileName', (req, res) => {
// //   const { fileType, fileName } = req.params;
// //   const filePath = path.join(__dirname, 'uploads', fileType, fileName);

// //   fs.unlink(filePath, (err) => {
// //     if (err) {
// //       console.error('Error deleting file:', err);
// //       return res.status(500).send('Error deleting file');
// //     }
// //     res.send('File deleted successfully');
// //   });
// // });

// // export default router;





// // uploadsRoutes.js
// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const router = express.Router();

// // router.get("/", async (req, res) => {
// //   res.json({ msg: "upload route" });
// // });

// router.post("/", async (req, res) => {
//   console.log("post");
//   if (!req.files || Object.keys(req.files).length === 0) { // בדיקה האם יש קבצים
//     return res.status(400).json({ msg: "No files were uploaded." });
//   }

//   let myFile = req.files.photos; // האובייקט של התמונה
//   let myVidios = req.files.videos;
//   console.log(myFile);
//   if (req.files.photos != undefined) {
//     if (myFile && myFile.size <= 1024 * 1024 * 10) { // בדיקת גודל הקובץ
//       let whichFiles = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];
//       let extFile = path.extname(myFile.name);
//       const timestamp = Date.now();
//       const newFileName = `${timestamp}${extFile}`;

//       if (whichFiles.includes(extFile)) { // בדיקת סיומת הקובץ
//         myFile.mv("uploads/" + newFileName, (err) => { // איפה נשמר
//           if (err) {
//             return res.status(500).json({ msg: "Error occurred while uploading the file", err });
//           }

//         });
//       } else {
//         return res.status(400).json({ msg: "File must be an image or video" });
//       }
//     } else {
//       return res.status(400).json({ msg: "File too big, max 10 MB!" });
//     }
//   }
//   if (req.files.videos != undefined) {
//     console.log("videos")
//     if (myVidios && myVidios.size <= 1024 * 1024 * 10) { // בדיקת גודל הקובץ
//       let whichFiles = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];
//       let extFile = path.extname(myVidios.name);
//       const timestamp = Date.now();
//       const newFileName = `${timestamp}${extFile}`;

//       if (whichFiles.includes(extFile)) { // בדיקת סיומת הקובץ
//         myVidios.mv("uploads/" + newFileName, (err) => { // איפה נשמר
//           if (err) {
//             return res.status(500).json({ msg: "Error occurred while uploading the file", err });
//           }
//           // res.json({ msg: "File uploaded successfully" });
//         });
//       } else {
//         return res.status(400).json({ msg: "File must be an image or video" });
//       }
//     } else {
//       return res.status(400).json({ msg: "File too big, max 10 MB!" });
//     }
//   }
//   res.json({ msg: "File uploaded successfully" });
//   console.log(req.files);
// });

// // מחיקת קובץ
// router.delete("/:filename", async (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, '../uploads', filename);
//   console.log(filePath);
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       if (err.code === 'ENOENT') {//אם אין כזה קובץ
//         return res.status(404).json({ msg: "File not found" });
//       }
//       return res.status(500).json({ msg: "Error occurred while deleting the file", err });// שגיאות נוספות
//     }
//     res.json({ msg: "File deleted successfully" });
//   });
// });


// // קבלת קובץ
// router.get("/:filename", async (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, '../uploads', filename);

//   // בדיקת האם הקובץ קיים
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(404).json({ msg: "File not found" });
//     }

//     // שליחת הקובץ ללקוח
//     res.sendFile(filePath, (err) => {
//       if (err) {
//         if (err.code === 'ECONNABORTED') {
//           console.warn("Request aborted by the client");
//         } else {
//           console.error("Error occurred while sending the file", err);
//           res.status(500).send("Error occurred while sending the file");
//         }
//       }
//     });
//   });
// });

// export default router;













// import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const router = express.Router();

// router.post("/", async (req, res) => {
//   console.log("post");
//   if (!req.files || Object.keys(req.files).length === 0) { // בדיקה האם יש קבצים
//     return res.status(400).json({ msg: "No files were uploaded." });
//   }

//   let uploadedPhotos = [];
//   let uploadedVideos = [];

//   const saveFile = (file, type) => {
//     return new Promise((resolve, reject) => {
//       if (file && file.size <= 1024 * 1024 * 10) { // בדיקת גודל הקובץ
//         console.log(file);
//         let whichFiles = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];
//         let extFile = path.extname(file.name).toLowerCase();
//         const timestamp = Date.now();
//         const newFileName = `${timestamp}${extFile}`;

//         if (whichFiles.includes(extFile)) { // בדיקת סיומת הקובץ
//           // file.mv(path.join(__dirname, 'uploads', newFileName), (err) => { // איפה נשמר
//           file.mv("uploads/" + newFileName, (err) => { // איפה נשמר
//             if (err) {
//               console.log("error "+newFileName)
//               return reject(new Error("Error occurred while uploading the file"));
//             }

//             if (type === 'photo') {
//               console.log("ok photo "+newFileName);
//               uploadedPhotos.push(newFileName);
//             } else if (type === 'video') {
//               console.log("ok video "+newFileName);
//               uploadedVideos.push(newFileName);
//             }
//             resolve();
//           });
//         } else {
//           reject(new Error("File must be an image or video"));
//         }
//       } else {
//         reject(new Error("File too big, max 10 MB!"));
//       }
//     });
//   };

//   try {
//     const fileUploadPromises = [];

//     if (req.files.photos) {
//       if (Array.isArray(req.files.photos)) {
//         req.files.photos.forEach(photo => fileUploadPromises.push(saveFile(photo, 'photo')));
//       } else {
//         fileUploadPromises.push(saveFile(req.files.photos, 'photo'));
//       }
//     }

//     if (req.files.videos) {
//       if (Array.isArray(req.files.videos)) {
//         req.files.videos.forEach(video => fileUploadPromises.push(saveFile(video, 'video')));
//       } else {
//         fileUploadPromises.push(saveFile(req.files.videos, 'video'));
//       }
//     }

//     await Promise.all(fileUploadPromises);

//     res.json({ msg: "Files uploaded successfully", photos: uploadedPhotos, videos: uploadedVideos });
//     console.log(req.files);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

// export default router;

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'; // ייבוא uuid

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

//הוספת קבצים.
router.post("/", async (req, res) => {
  console.log("post");

  let uploadedPhotos = [];
  let uploadedVideos = [];

  const saveFile = (file, type) => {
    return new Promise((resolve, reject) => {
      if (file && file.size <= 1024 * 1024 * 100) { // בדיקת גודל הקובץ
        let whichFiles = [".png", ".jpg", ".jpeg", ".svg", ".gif", ".mp4", ".mov", ".avi", ".wmv", ".avchd", ".webm", ".flv"];
        let extFile = path.extname(file.name).toLowerCase();
        // const timestamp = Date.now();  
        // const newFileName = `${timestamp}${extFile}`;
        const newFileName = `${uuidv4()}${extFile}`;

        if (whichFiles.includes(extFile)) { // בדיקת סיומת הקובץ
          file.mv(path.join('uploads', newFileName), (err) => { // איפה נשמר
            if (err) {
              return reject(new Error(`Error occurred while uploading the file: ${newFileName} - ${err.message}`));
            }

            if (type === 'photo') {
              uploadedPhotos.push(newFileName);
            } else if (type === 'video') {
              uploadedVideos.push(newFileName);
            }
            resolve();
          });
        } else {
          reject(new Error("File must be an image or video"));
        }
      } else {
        reject(new Error("File too big, max 10 MB!"));
      }
    });
  };

  try {
    const fileUploadPromises = [];

    if (req.files && req.files.photos) {
      if (Array.isArray(req.files.photos)) {
        req.files.photos.forEach(photo => fileUploadPromises.push(saveFile(photo, 'photo')));
      } else {
        fileUploadPromises.push(saveFile(req.files.photos, 'photo'));
      }
    }

    if (req.files && req.files.videos) {
      if (Array.isArray(req.files.videos)) {
        req.files.videos.forEach(video => fileUploadPromises.push(saveFile(video, 'video')));
      } else {
        fileUploadPromises.push(saveFile(req.files.videos, 'video'));
      }
    }

    if (fileUploadPromises.length === 0) {
      // אם אין קבצים להעלות, שלח תגובה ריקה בהצלחה
      return res.json({ msg: "No files were uploaded." });
    }

    await Promise.all(fileUploadPromises);

    res.json({ msg: "Files uploaded successfully", photos: uploadedPhotos, videos: uploadedVideos });
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).json({ msg: error.message });
  }
});



// מחיקת קובץ
router.delete("/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {//אם אין כזה קובץ
        return res.status(404).json({ msg: "File not found" });
      }
      return res.status(500).json({ msg: "Error occurred while deleting the file", err });// שגיאות נוספות
    }
    res.json({ msg: "File deleted successfully" });
  });
});



// קבלת קובץ
router.get("/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);

  // בדיקת האם הקובץ קיים
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ msg: "File not found" });
    }

    // שליחת הקובץ ללקוח
    res.sendFile(filePath, (err) => {
      if (err) {
        if (err.code === 'ECONNABORTED') {
          console.warn("Request aborted by the client");
        } else {
          console.error("Error occurred while sending the file", err);
          res.status(500).send("Error occurred while sending the file");
        }
      }
    });
  });
});

export default router;