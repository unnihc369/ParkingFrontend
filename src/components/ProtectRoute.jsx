import React, { useContext, useEffect } from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ children, ...rest }) => {
    const { user } = useAuthContext();
    const navigate = useNavigate(); 
    useEffect(()=>{
        if (!user) {
            navigate('/login');
            return null;
        }
    })
    

    return (
        <Route {...rest}>
            {user ? children : <Navigate to="/login" replace />}
        </Route>
    );
};

export default ProtectedRoute;
