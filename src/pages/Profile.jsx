import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({});
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('user')).userid;
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:4000/user/${userId}`);
                const data = await response.json();
                setUser(data);
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        const fetchVehicles = async () => {
            try {
                const response = await fetch(`http://localhost:4000/vehicle/${userId}`);
                const data = await response.json();
                setVehicles(data);
                console.log(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchUser();
        fetchVehicles();
    }, []);

    return (
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto my-8 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                <div className="text-center mt-4">
                    <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
                    <p className="text-gray-700">{user.email}</p>
                </div>
                <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-gray-600">
                        <span>Username:</span>
                        <span>{user.username}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Phone Number:</span>
                        <span>{user.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Address:</span>
                        <span>{user.address}</span>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow-md">
                <div className="text-center mt-4">
                    <h2 className="text-xl font-semibold text-gray-900">Vehicles</h2>
                </div>
                <div className="mt-6 space-y-4">
                    {vehicles.map(vehicle => (
                        <div key={vehicle._id} className="flex flex-col text-gray-600 border p-4 rounded-md">
                            <div className="flex justify-between">
                                <span>Plate Number:</span>
                                <span>{vehicle.plateNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Car Model:</span>
                                <span>{vehicle.carModel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Is Parked:</span>
                                <span>{vehicle.isParked ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
