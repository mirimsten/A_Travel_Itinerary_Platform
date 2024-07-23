// // import dotenv from 'dotenv';
// // import mongoose from 'mongoose';
// // const AutoIncrement = require('mongoose-sequence')(mongoose);
// // const Schema = mongoose.Schema;

// // dotenv.config({ path: '../.env' });
// // const HOST = process.env.MONGODB_HOST;
// // const DATABASE = process.env.MONGODB_DATABASE;

// // // חיבור למסד הנתונים
// // mongoose.connect(`mongodb://${HOST}/${DATABASE}`, {
// //   // useNewUrlParser: true,
// //   // useUnifiedTopology: true
// // }).then(() => {
// //   console.log("Connected to the database!");
// // }).catch((err) => {
// //   console.error("Error connecting to the database", err);
// // });

// // // הגדרת סכימה עבור User
// // const userSchema = new Schema({
// //   userId: { type: Number, index: true, unique: true },
// //   userName: { type: String, required: true },
// //   email: { type: String, required: true },
// //   address: { type: String, required: true },
// //   phone: { type: String },
// //   isAdmin: { type: Boolean, default: false },
// //   isBlocked: { type: Boolean, default: false}
// // });

// // // שימוש ב-AutoIncrement עבור userSchema
// // userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// // // הגדרת סכימה עבור Password
// // const passwordSchema = new Schema({
// //   userId: { type: Number, ref: 'User', required: true },
// //   createdAt: { type: Date, default: Date.now },
// //   password: { type: String, required: true, unique: true }
// // });

// // // הגדרת סכימה עבור Saved_Search_Trips
// // const savedSearchTripsSchema = new Schema({
// //   searchTripId: { type: Number, index: true, unique: true },
// //   userId: { type: Number, ref: 'User', required: true },
// //   country: { type: String },
// //   startDate: { type: Date },
// //   endDate: { type: Date }
// // });

// // // שימוש ב-AutoIncrement עבור savedSearchTripsSchema
// // savedSearchTripsSchema.plugin(AutoIncrement, { inc_field: 'searchTripId' });

// // // הגדרת סכימה עבור Trips
// // const tripsSchema = new Schema({
// //   tripId: { type: Number, index: true, unique: true },
// //   title: { type: String, required: true },
// //   userId: { type: Number, ref: 'User', required: true },
// //   country: { type: String },
// //   description: { type: String },
// //   duration: { type: String },
// //   photos: { type: [String] },
// //   videos: { type: [String] },
// //   likes: { type: Number, default: 0 }
// // });

// // // שימוש ב-AutoIncrement עבור tripsSchema
// // tripsSchema.plugin(AutoIncrement, { inc_field: 'tripId' });

// // // הגדרת סכימה עבור Comments
// // const commentsSchema = new Schema({
// //   commentId: { type: Number, index: true, unique: true },
// //   userId: { type: Number, ref: 'User', required: true },
// //   username: { type: String, required: true },
// //   tripId: { type: Number, ref: 'Trip', required: true },
// //   content: { type: String },
// //   imageUrl: { type: String }
// // });

// // // שימוש ב-AutoIncrement עבור commentsSchema
// // commentsSchema.plugin(AutoIncrement, { inc_field: 'commentId' });

// // // יצירת מודלים
// // const User = mongoose.model('User', userSchema);
// // const Password = mongoose.model('Password', passwordSchema);
// // const Trip = mongoose.model('Trip', tripsSchema);
// // const SavedSearchTrip = mongoose.model('Saved_Search_Trip', savedSearchTripsSchema);
// // const Comment = mongoose.model('Comment', commentsSchema);

// // // הכנסה של דוגמת נתונים לכל אוסף
// // async function createSampleData() {
// //   try {
// //     // const user = await User.create({
// //     //   userName: 'aa',
// //     //   email: 'a@example.com',
// //     //   address: '123 Main St',
// //     //   phone: '555-1234',
// //     //   isAdmin: false,
// //     //   isBlocked: false
// //     // });

// //     // const password = await Password.create({
// //     //   userId: user.userId,
// //     //   createdAt: new Date(),
// //     //   password: 'password'
// //     // });

// //     // const trip = await Trip.create({
// //     //   title: 'Trip to Paris',
// //     //   userId: user.userId,
// //     //   country: 'France',
// //     //   description: 'A wonderful trip to Paris',
// //     //   duration: '7 days',
// //     //   photos: ['image1.jpg', 'image2.jpg'],
// //     //   videos: ['video1.mp4'],
// //     //   likes: 10
// //     // });

// //     // const savedSearchTrip = await SavedSearchTrip.create({
// //     //   userId: user.userId,
// //     //   country: 'France',
// //     //   startDate: new Date('2023-06-01'),
// //     //   endDate: new Date('2023-06-08')
// //     // });

// //     // const comment = await Comment.create({
// //     //   userId: user.userId,
// //     //   username: 'John Doe',
// //     //   tripId: trip.tripId,
// //     //   content: 'Great trip!',
// //     //   imageUrl: 'commentImage.jpg'
// //     // });

// //     console.log('Sample data inserted into collections');
// //   } catch (error) {
// //     console.error('Error creating sample data:', error);
// //   } finally {
// //     // סגירת החיבור
// //     mongoose.connection.close();
// //   }
// // }

// // // קריאה לפונקציה ליצירת נתוני דוגמה
// // createSampleData();

// // export { User, Password, Trip, SavedSearchTrip, Comment };


// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const AutoIncrement = require('mongoose-sequence')(mongoose);
// const Schema = mongoose.Schema;

// dotenv.config({ path: '../.env' });
// const HOST = process.env.MONGODB_HOST||'localhost:27017';
// const DATABASE = process.env.MONGODB_DATABASE||'travelApp';

// // חיבור למסד הנתונים
// mongoose.connect(`mongodb://${HOST}/${DATABASE}`).then(() => {
//   console.log("Connected to the database!");
// }).catch((err) => {
//   console.error("Error connecting to the database", err);
// });

// // הגדרת סכימה עבור User
// const userSchema = new Schema({
//   userId: { type: Number, index: true, unique: true },
//   userName: { type: String, required: true },
//   email: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String },
//   isAdmin: { type: Boolean, default: false },
//   isBlocked: { type: Boolean, default: false}
// });

// // שימוש ב-AutoIncrement עבור userSchema
// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// // הגדרת סכימה עבור Password
// const passwordSchema = new Schema({
//   userId: { type: Number, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
//   password: { type: String, required: true, unique: true }
// });

// // הגדרת סכימה עבור Saved_Search_Trips
// const savedSearchTripsSchema = new Schema({
//   searchTripId: { type: Number, index: true, unique: true },
//   userId: { type: Number, ref: 'User', required: true },
//   country: { type: String },
//   startDate: { type: Date },
//   endDate: { type: Date }
// });

// // שימוש ב-AutoIncrement עבור savedSearchTripsSchema
// savedSearchTripsSchema.plugin(AutoIncrement, { inc_field: 'searchTripId' });

// // הגדרת סכימה עבור Trips
// const tripsSchema = new Schema({
//   tripId: { type: Number, index: true, unique: true },
//   title: { type: String, required: true },
//   userId: { type: Number, ref: 'User', required: true },
//   country: { type: String },
//   description: { type: String },
//   duration: { type: String },
//   photos: { type: [String] },
//   videos: { type: [String] },
//   likes: { type: Number, default: 0 }
// });

// // שימוש ב-AutoIncrement עבור tripsSchema
// tripsSchema.plugin(AutoIncrement, { inc_field: 'tripId' });

// // הגדרת סכימה עבור Comments
// const commentsSchema = new Schema({
//   commentId: { type: Number, index: true, unique: true },
//   userId: { type: Number, ref: 'User', required: true },
//   username: { type: String, required: true },
//   tripId: { type: Number, ref: 'Trip', required: true },
//   content: { type: String },
//   imageUrl: { type: String }
// });

// // שימוש ב-AutoIncrement עבור commentsSchema
// commentsSchema.plugin(AutoIncrement, { inc_field: 'commentId' });

// // יצירת מודלים
// const User = mongoose.model('User', userSchema);
// const Password = mongoose.model('Password', passwordSchema);
// const Trip = mongoose.model('Trip', tripsSchema);
// const SavedSearchTrip = mongoose.model('Saved_Search_Trip', savedSearchTripsSchema);
// const Comment = mongoose.model('Comment', commentsSchema);

// // הכנסה של דוגמת נתונים לכל אוסף
// async function createSampleData() {
//   try {
//     // const user = await User.create({
//     //   userName: 'aa',
//     //   email: 'a@example.com',
//     //   address: '123 Main St',
//     //   phone: '555-1234',
//     //   isAdmin: false,
//     //   isBlocked: false
//     // });

//     // const password = await Password.create({
//     //   userId: user.userId,
//     //   createdAt: new Date(),
//     //   password: 'password'
//     // });

//     // const trip = await Trip.create({
//     //   title: 'Trip to Paris',
//     //   userId: user.userId,
//     //   country: 'France',
//     //   description: 'A wonderful trip to Paris',
//     //   duration: '7 days',
//     //   photos: ['image1.jpg', 'image2.jpg'],
//     //   videos: ['video1.mp4'],
//     //   likes: 10
//     // });

//     // const savedSearchTrip = await SavedSearchTrip.create({
//     //   userId: user.userId,
//     //   country: 'France',
//     //   startDate: new Date('2023-06-01'),
//     //   endDate: new Date('2023-06-08')
//     // });

//     // const comment = await Comment.create({
//     //   userId: user.userId,
//     //   username: 'John Doe',
//     //   tripId: trip.tripId,
//     //   content: 'Great trip!',
//     //   imageUrl: 'commentImage.jpg'
//     // });

//     console.log('Sample data inserted into collections');
//   } catch (error) {
//     console.error('Error creating sample data:', error);
//   } finally {
//     // סגירת החיבור
//     mongoose.connection.close();
//   }
// }

// // קריאה לפונקציה ליצירת נתוני דוגמה
// createSampleData();

// export { User, Password, Trip, SavedSearchTrip, Comment };











import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

dotenv.config({ path: '../.env' });
const HOST = process.env.MONGODB_HOST || 'localhost:27017';
const DATABASE = process.env.MONGODB_DATABASE || 'travelApp';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${HOST}/${DATABASE}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 שניות timeout
      socketTimeoutMS: 45000 // 45 שניות timeout לחיבור
    });
    console.log("Connected to the database!");
  } catch (err) {
    console.error("Error connecting to the database", err);
    process.exit(1); // סיום התהליך במקרה של שגיאה
  }
};

// הגדרת סכימה עבור User
const userSchema = new Schema({
  //userId: { type: Number, index: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false }
});

// // שימוש ב-AutoIncrement עבור userSchema
// userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// הגדרת סכימה עבור Password
const passwordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  password: { type: String, required: true, unique: true }
});

// הגדרת סכימה עבור Saved_Search_Trips
const savedSearchTripsSchema = new Schema({
  // searchTripId: { type: Number, index: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  country: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
});

// // שימוש ב-AutoIncrement עבור savedSearchTripsSchema
// savedSearchTripsSchema.plugin(AutoIncrement, { inc_field: 'searchTripId' });

// הגדרת סכימה עבור Trips
const tripsSchema = new Schema({
  // tripId: { type: Number, index: true, unique: true },
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  country: { type: String },
  description: { type: String },
  duration: { type: String },
  photos: { type: [String] },
  videos: { type: [String] },
  likes: { type: Number, default: 0 }
});

// // שימוש ב-AutoIncrement עבור tripsSchema
// tripsSchema.plugin(AutoIncrement, { inc_field: 'tripId' });

// הגדרת סכימה עבור Comments
const commentsSchema = new Schema({
  // commentId: { type: Number, index: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
  content: { type: String },
  imageUrl: { type: String }
});

const massagesSchema = new Schema({
  // commentId: { type: Number, index: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  isRead: { type: Boolean, default: false }
});

// // שימוש ב-AutoIncrement עבור commentsSchema
// commentsSchema.plugin(AutoIncrement, { inc_field: 'commentId' });

// יצירת מודלים
const User = mongoose.model('User', userSchema);
const Password = mongoose.model('Password', passwordSchema);
const Trip = mongoose.model('Trip', tripsSchema);
const SavedSearchTrip = mongoose.model('Saved_Search_Trip', savedSearchTripsSchema);
const Comment = mongoose.model('Comment', commentsSchema);
const Massage = mongoose.model('Massage', massagesSchema);



connectDB();

export { User, Password, Trip, SavedSearchTrip, Comment, Massage };
