import { Navigate, BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LogIn from './components/LogIn';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Info from './components/Info';
import ListTrips from './components/Trips/ListTrips';
// import Trip from './components/Trips/Trip';
import LogOut from './components/LogOut';
import Comments from './components/Comments/Comments';
// import ListTrips from './components/Trips_/ListTrips';
import FlightsSearch from './api';
import Massages from './components/Massages/Massages';

function AppContent() {
  const location = useLocation();

  const showNavbar = location.pathname !== "/logIn" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/logIn" />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" >
          <Route path="info" element={<Info />} />
          <Route path="home" element={<Home />} />
          <Route path="logOut" element={<LogOut />} />
          <Route path="newTrip" element={<FlightsSearch />} />
          <Route path="massages" element={<Massages />} />
          <Route path="trips" element={<ListTrips />} />
          <Route path="trips/:tripId/comments" element={<Comments />} />
          {/* <Route path="trips/:trip-id/trip" element={<Trip />} /> */}
          {/* <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} /> */}
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
