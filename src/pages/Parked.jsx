import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ParkedVehicles = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = JSON.parse(localStorage.getItem('user')).userid;

    useEffect(() => {
        const fetchParkedVehicles = async () => {
            const userId = JSON.parse(localStorage.getItem('user')).userid;
            if (!userId) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/parking/${userId}`);
                const data = await response.json();
                setVehicles(data);
                console.log(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParkedVehicles();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (vehicles.length === 0) return <p>No vehicles parked.</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Parked Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="p-4 border rounded shadow-lg bg-white">
                        <h3 className="text-xl font-bold">{vehicle.vehicle.carModel}</h3>
                        <p><strong>Plate Number:</strong> {vehicle.vehicle.plateNumber}</p>
                        <p><strong>Parked At:</strong> {new Date(vehicle.parkedAt).toLocaleString()}</p>
                        <p><strong>Slot No:</strong> {vehicle.slotNo}</p>
                        <Link to={`/parking/depark/${vehicle._id}`}>
                            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Depark Vehicle
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkedVehicles;
