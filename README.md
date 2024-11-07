# Travel Itinerary Platform

Welcome to the Travel Itinerary Platform! This platform allows users to create and share custom travel itineraries. Built with Node.js, Express, React, and MongoDB, it provides real-time integration with Google Flights and Booking.com to help users find flights and accommodations tailored to their preferences.

## Features

- **Create Custom Travel Itineraries**: Users can build personalized travel routes based on their desired dates and destinations.
- **Real-Time Flight & Accommodation Search**: Integrated with Google Flights and Booking.com APIs, enabling users to find and book flights and accommodations that suit their plans.
- **Travel Blog**: Users can share their itineraries and travel experiences on the platform, allowing others to read, comment, and get inspired.
- **User Registration**: Allows users to register, log in, and save their travel plans for future reference.
- **Responsive Design**: The platform is designed to work seamlessly on both desktop and mobile devices.

## Technology Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **APIs**: Google Flights, Booking.com

## Getting Started

Follow these steps to set up the project on your local machine:

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd your-repo-name
   ```
3. **Install Backend Dependencies:**
   ```bash
   npm install
   ```
4. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```
5. **Set Up Environment Variables**: In the root directory, create a .env file with the following content:
   MONGODB_URI=your-mongodb-uri
   GOOGLE_FLIGHTS_API_KEY=your-google-flights-api-key
   BOOKING_COM_API_KEY=your-booking-com-api-key
6. **Run the Application**: Start both backend and frontend servers. If your package.json includes a command to run both servers, use the following:
   ```bash
   npm run dev
   ```
   This will start the backend server at [http://localhost:3000](http://localhost:3000)
   
 
