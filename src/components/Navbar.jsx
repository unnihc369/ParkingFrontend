import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header className="bg-gray-900 text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold">
                        Parking
                    </Link>
                    <nav>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/parkinglot" className="hover:text-gray-300 px-3 py-1">
                                    Park a Vehicle
                                </Link>
                                <Link to="/parked" className="hover:text-gray-300 px-3 py-1">
                                    Parked
                                </Link>
                                <Link to='/user'><span>{user.email}</span></Link>
                                <button
                                    onClick={handleClick}
                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link to="/login" className="hover:text-gray-300 px-3 py-1">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
