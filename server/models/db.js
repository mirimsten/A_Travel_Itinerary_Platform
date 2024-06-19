const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// חיבור למסד הנתונים
mongoose.connect('mongodb://localhost:27017/travelApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the database!");
}).catch((err) => {
  console.error("Error connecting to the database", err);
});

// הגדרת סכימה עבור User
const userSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false}
});

// שימוש ב-AutoIncrement עבור userSchema
userSchema.plugin(AutoIncrement, { inc_field: 'id' });

// הגדרת סכימה עבור Password
const passwordSchema = new Schema({
  userId: { type: Number, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  hash: { type: String, required: true }
});

// הגדרת סכימה עבור Saved_Search_Trips
const savedSearchTripsSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  userId: { type: Number, ref: 'User', required: true },
  country: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
});

// שימוש ב-AutoIncrement עבור savedSearchTripsSchema
savedSearchTripsSchema.plugin(AutoIncrement, { inc_field: 'id' });

// הגדרת סכימה עבור Trips
const tripsSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  title: { type: String, required: true },
  userId: { type: Number, ref: 'User', required: true },
  country: { type: String },
  description: { type: String },
  duration: { type: String },
  photos: { type: [String] },
  videos: { type: [String] },
  likes: { type: Number, default: 0 }
});

// שימוש ב-AutoIncrement עבור tripsSchema
tripsSchema.plugin(AutoIncrement, { inc_field: 'id' });

// הגדרת סכימה עבור Comments
const commentsSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  userId: { type: Number, ref: 'User', required: true },
  username: { type: String, required: true },
  tripId: { type: Number, ref: 'Trip', required: true },
  content: { type: String },
  imageUrl: { type: String }
});

// שימוש ב-AutoIncrement עבור commentsSchema
commentsSchema.plugin(AutoIncrement, { inc_field: 'id' });

// יצירת מודלים
const User = mongoose.model('User', userSchema);
const Password = mongoose.model('Password', passwordSchema);
const Trip = mongoose.model('Trip', tripsSchema);
const SavedSearchTrip = mongoose.model('Saved_Search_Trip', savedSearchTripsSchema);
const Comment = mongoose.model('Comment', commentsSchema);

// הכנסה של דוגמת נתונים לכל אוסף
async function createSampleData() {
  try {
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      phone: '555-1234',
      isAdmin: false
    });

    const password = await Password.create({
      userId: user.id,
      createdAt: new Date(),
      hash: 'hashedpassword'
    });

    const trip = await Trip.create({
      title: 'Trip to Paris',
      userId: user.id,
      country: 'France',
      description: 'A wonderful trip to Paris',
      duration: '7 days',
      photos: ['image1.jpg', 'image2.jpg'],
      videos: ['video1.mp4'],
      likes: 10
    });

    const savedSearchTrip = await SavedSearchTrip.create({
      userId: user.id,
      country: 'France',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-08')
    });

    const comment = await Comment.create({
      userId: user.id,
      username: 'John Doe',
      tripId: trip.id,
      content: 'Great trip!',
      imageUrl: 'commentImage.jpg'
    });

    console.log('Sample data inserted into collections');
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    // סגירת החיבור
    mongoose.connection.close();
  }
}

// קריאה לפונקציה ליצירת נתוני דוגמה
createSampleData();