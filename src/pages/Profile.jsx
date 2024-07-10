import React, { useEffect, useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const UserProfile = () => {
    const [user, setUser] = useState([]);

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
        }
        fetchUser();
    })
    return (
        <div className="max-w-sm mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
                <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="mt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                    <span>Phone Number:</span>
                    <span>{user.phoneNumber}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Address:</span>
                    <span>{user.address}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Admin:</span>
                    <span>{user.isAdmin ? 'Yes' : 'No'}</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;