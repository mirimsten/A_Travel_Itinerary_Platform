import { getAllTrips, getTripById, createTrip, updateTrip, deleteTripById } from '../models/tripModel.js';

// //controller function to get all trips
// export const getTrips_ = async (req, res) => {
//     const tripData = req.body;
//     try {
//         const trips = await getAllTrips(tripData);
//         res.status(200).json(trips);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// controller function to get all trips
export const getTrips_ = async (req, res) => {
    const { country, userId, sortBy, limit, offset } = req.query; // קבלת הפרמטרים מהשאילתה
    try {
        const trips = await getAllTrips({ country, userId, sortBy, limit, offset });
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controller function to get a trip by ID
export const getTripById_ = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await getTripById(id);
        if (trip.length) {
            res.status(200).json(trip);
        } else {
            // res.status(404).json({ message: `User with ID ${id} not found` });
            res.status(404).json(trip);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to create a new trip
export const createTrip_ = async (req, res) => {console.log(req.body)
    const { userId, country, title, description, duration, photos, videos } = req.body;
    // //---------------------------------------------------------------
    // if (!req.files || Object.keys(req.files).length === 0) { // בדיקה האם יש קבצים
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
      //-------------------------------------------
    // const photos = req.files.filter(file => file.mimetype.startsWith('image/')).map(file => file.path);
    // const videos = req.files.filter(file => file.mimetype.startsWith('video/')).map(file => file.path);


    // const photos = req.files['photos'] ? req.files['photos'].map(file => file.path) : [];
    // const videos = req.files['videos'] ? req.files['videos'].map(file => file.path) : [];

    try {
        const newTrip = await createTrip({ userId, country, title, description, duration, photos, videos });
        console.log(userId+" "+ country+" "+title+" "+description+" "+duration+" "+photos+" "+videos)
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to update a trip by ID
export const updateTrip_ = async (req, res) => {
    const { id } = req.params;
    const tripData = req.body;
    try {
        const updatedTrip = await updateTrip(id, tripData);
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to delete a trip by ID
export const deleteTrip_ = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteTripById(id);
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: `Trip with ID ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};