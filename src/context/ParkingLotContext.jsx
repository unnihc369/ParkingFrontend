import React, { createContext, useState, useContext, useEffect } from 'react';

const ParkingLotContext = createContext();

export const ParkingLotProvider = ({ children }) => {
    const [parkingLots, setParkingLots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchParkingLots = async () => {
        setLoading(true);
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

    useEffect(() => {
        fetchParkingLots();
    }, []);

    return (
        <ParkingLotContext.Provider value={{ parkingLots, loading, error, fetchParkingLots }}>
            {children}
        </ParkingLotContext.Provider>
    );
};

export const useParkingLotContext = () => {
    return useContext(ParkingLotContext);
};
