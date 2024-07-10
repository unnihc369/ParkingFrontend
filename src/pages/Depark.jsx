import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Depark = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeparkData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/parking/depark/${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDeparkData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Depark Vehicle</h2>
            <div className="bg-white shadow-md rounded p-6">
                <p className="text-lg font-semibold">Charge: ${data.charge}</p>
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Vehicle Details</h3>
                    <p><strong>Plate Number:</strong> {data.vehicle.plateNumber}</p>
                    <p><strong>Car Model:</strong> {data.vehicle.carModel}</p>
                    <p><strong>Vehicle ID:</strong> {data.vehicle._id}</p>
                    <p><strong>User ID:</strong> {data.vehicle.userId}</p>
                </div>
            </div>
        </div>
    );
};

export default Depark;
