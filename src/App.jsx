import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './components/Navbar.jsx'; // Import your Navbar component
import ParkingLots from './pages/ParkinLots.jsx';
import ParkingLotDetails from './pages/ParkingDetail.jsx';
import ParkedVehicles from './pages/Parked.jsx';
import Depark from './pages/Depark.jsx';
import UserProfile from './pages/Profile.jsx';
import AddVehicle from './pages/AddVehicle.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: '/login',
    element: (
      // Wrap Login with Navbar
      <div>
        <Navbar />
        <Login />
      </div>
    ),
  },
  {
    path: '/signup',
    element: (
      // Wrap Signup with Navbar
      <div>
        <Navbar />
        <Signup />
      </div>
    ),
  },
  {
    path: '/parkinglot',
    element: (
      <div>
        <Navbar />
        <ParkingLots />
      </div>
    ),
  },
  {
    path: '/parkinglot/:id',
    element: (
      <div>
        <Navbar />
        <ParkingLotDetails />
      </div>
    ),
  },
  {
    path: '/parked',
    element: (
      // Wrap Home with Navbar
      <div>
        <Navbar />
        <ParkedVehicles />
      </div>
    ),
  },
  {
    path: '/parking/depark/:id',
    element: (
      <div>
        <Navbar />
        <Depark />
      </div>
    ),
  },
  {
    path: '/user',
    element: (
      <div>
        <Navbar />
        <UserProfile />
      </div>
    ),
  },
  {
    path: '/addvehicle',
    element: (
      <div>
        <Navbar />
        <AddVehicle />
      </div>
    ),
  },
]);

function App() {
  return (
    <RouterProvider router={router} /> // Wrap your application with RouterProvider
  );
}

export default App;
