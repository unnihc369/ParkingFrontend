import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';

const ParkingLotDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [parkingLot, setParkingLot] = useState(null);
    const [occupiedSlots, setOccupiedSlots] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = JSON.parse(localStorage.getItem('user')).userid;

    useEffect(() => {
        const fetchParkingLot = async () => {

            try {
                const response = await fetch(`http://localhost:4000/parkinglot/${id}`);
                const data = await response.json();
                setParkingLot(data.parkingLot);
                setOccupiedSlots(data.occupiedSlots);
                console.log(data.occupiedSlots);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParkingLot();
    }, [id]);

    useEffect(() => {
        if (selectedSlot) {
            const user = JSON.parse(localStorage.getItem('user'));

            console.log(user.userid)
            const fetchUserVehicles = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/vehicle/${user.userid}`);
                    const data = await response.json();
                    setUserVehicles(data);
                } catch (err) {
                    setError(err.message);
                }
            };

            const timeoutId = setTimeout(() => {
                fetchUserVehicles();
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [selectedSlot]);

    const handlePark = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            setError('User not authenticated');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:4000/parking/park`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slotNo: selectedSlot, vehicleId: selectedVehicle, userId: user.userid, parkingLotId:parkingLot._id}),
            });
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            setOccupiedSlots([...occupiedSlots, selectedSlot]);
            navigate("/parkinglot");
            return null;
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
                {/* <div className="overflow-y-auto max-h-48 mb-4">
                    <h3 className="text-xl font-bold mb-2">Your Vehicles</h3>
                    {!userVehicles ?  <ul className="list-disc ml-5">
                        {userVehicles.map(vehicle => (
                            <li key={vehicle._id} className={`${vehicle.isParked ? 'text-gray-400' : 'text-black'}`}>
                                {vehicle.carModel} ({vehicle.plateNumber})
                            </li>
                        ))}
                    </ul> : <p>Please select Slot</p>} 
                    
                </div> */}
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
                    <Link to='/addvehicle'><h4 className='pb-6'>Add vehicle</h4></Link>
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
