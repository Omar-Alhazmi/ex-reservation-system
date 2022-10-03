import React from 'react'
import { HashRouter as Routes, Route, Navigate } from 'react-router-dom';

import  Instructors  from '../components/Instructors/Instructors';
import {PrivateRoute} from './PrivateRoute';
import Login  from '../components/Login/Login';
export default function RouteManagement() {

    return (
       <>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Instructors />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
        </>
    )
}
