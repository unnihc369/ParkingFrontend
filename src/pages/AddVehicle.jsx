import React, { useState } from 'react';

const AddVehicle = () => {
    const [plateNumber, setPlateNumber] = useState('');
    const [carModel, setCarModel] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user')).userid;
        try {
            const response = await fetch('http://localhost:4000/vehicle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plateNumber, carModel, userId })
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Vehicle added successfully!');
                setPlateNumber('');
                setCarModel('');
            } else {
                setMessage(data.message || 'Error adding vehicle');
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Add Vehicle</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Plate Number</label>
                        <input
                            type="text"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Model Name</label>
                        <input
                            type="text"
                            value={carModel}
                            onChange={(e) => setCarModel(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    {message && (
                        <div className="text-center text-red-500">
                            {message}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        Add Vehicle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddVehicle;
