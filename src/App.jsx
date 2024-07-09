import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Navbar from './components/Navbar.jsx'; // Import your Navbar component
import ParkingLots from './pages/ParkinLots.jsx';
import ParkingLotDetails from './pages/ParkingDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      // Wrap Home with Navbar
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
]);

function App() {
  return (
    <RouterProvider router={router} /> // Wrap your application with RouterProvider
  );
}

export default App;
