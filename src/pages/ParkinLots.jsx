import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ParkingLots = () => {
    const [parkingLots, setParkingLots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParkingLots = async () => {
            try {
                const response = await fetch('http://localhost:4000/parkinglot'); 
                const data = await response.json();
                setParkingLots(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParkingLots();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Parking Lots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parkingLots.map((lot) => (
                    <div key={lot._id} className="bg-gray-800 text-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-semibold">{lot.name}</h3>
                        <p>{lot.address}</p>
                        <p>Slots: {lot.noOfSlots}</p>
                        <p>Price/Hour: ₹{lot.pricePerHour}</p>
                        <Link to={`/parkinglot/${lot._id}`} className="text-blue-500 hover:underline mt-2 block">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingLots;
