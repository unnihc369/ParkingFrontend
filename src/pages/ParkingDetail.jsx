import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ParkingLotDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [parkingLot, setParkingLot] = useState(null);
    const [occupiedSlots, setOccupiedSlots] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParkingLot = async () => {
            try {
                const response = await fetch(`http://localhost:4000/parkinglot/${id}`);
                const data = await response.json();
                setParkingLot(data.parkingLot);
                setOccupiedSlots(data.occupiedSlots);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserVehicles = async () => {
            console.log(user);
            try {
                const response = await fetch(`http://localhost:4000/vehicle/668d320c25d182e0d5d7c4c7`);
                const data = await response.json();
                setUserVehicles(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchParkingLot();
        fetchUserVehicles();
    }, [id]);

    const handlePark = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/parkinglot/park`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotNumber: selectedSlot, vehicleId: selectedVehicle }),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setOccupiedSlots([...occupiedSlots, selectedSlot]);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!parkingLot) return <p>Parking lot not found</p>;

    const emptySlots = Array.from({ length: parkingLot.noOfSlots }, (_, i) => i + 1).filter(
        (slot) => !occupiedSlots.includes(slot)
    );

    return (
        <div className="container mx-auto p-4 flex flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 p-4">
                <h2 className="text-2xl font-bold mb-4">{parkingLot.name}</h2>
                <p><strong>Address:</strong> {parkingLot.address}</p>
                <p><strong>Number of Slots:</strong> {parkingLot.noOfSlots}</p>
                <p><strong>Price per Hour:</strong> ${parkingLot.pricePerHour}</p>
                <div className="grid grid-cols-5 gap-4 mt-4">
                    {Array.from({ length: parkingLot.noOfSlots }, (_, i) => (
                        <div
                            key={i + 1}
                            className={`p-2 border rounded ${occupiedSlots.includes(i + 1) ? 'bg-red-500' : 'bg-green-500'} text-white`}
                        >
                            Slot {i + 1}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-1/3 p-4 flex flex-col">
                <div className="overflow-y-auto max-h-48 mb-4">
                    <h3 className="text-xl font-bold mb-2">Your Vehicles</h3>
                    <ul className="list-disc ml-5">
                        {userVehicles.map(vehicle => (
                            <li key={vehicle._id} className={`${vehicle.isParked ? 'text-gray-400' : 'text-black'}`}>
                                {vehicle.carModel} ({vehicle.plateNumber})
                            </li>
                        ))}
                    </ul>
                </div>
                <form onSubmit={handlePark} className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Park Your Vehicle</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">Select Slot</label>
                        <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select a slot</option>
                            {emptySlots.map((slot) => (
                                <option key={slot} value={slot}>
                                    Slot {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Select Vehicle</label>
                        <select
                            value={selectedVehicle}
                            onChange={(e) => setSelectedVehicle(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select a vehicle</option>
                            {userVehicles
                                .filter((vehicle) => !vehicle.isParked)
                                .map((vehicle) => (
                                    <option key={vehicle._id} value={vehicle._id}>
                                        {vehicle.carModel} ({vehicle.plateNumber})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    >
                        Park Vehicle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ParkingLotDetails;
