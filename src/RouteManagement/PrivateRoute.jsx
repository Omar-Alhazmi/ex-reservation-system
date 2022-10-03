import { Navigate } from 'react-router-dom';
// import { history } from '../components/Login/history';
import { getInfo, checkStorage } from '../components/helperMethods';
import React from 'react'

export { PrivateRoute };
function PrivateRoute({ children }) {
    return (checkStorage() !== null && checkStorage() !== undefined && getInfo().data.Role === "Instructor" )? children : <Navigate to={"/"} />
};