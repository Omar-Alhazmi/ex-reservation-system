import React from 'react'
import { Routes, Route } from 'react-router-dom';


import Instructors from './components/Instructors/Instructors';
import { PrivateRoute } from './RouteManagement/PrivateRoute';
import { Login } from './components/Login/Login';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/ex-reservation-system/#/Instructor"
          element={
            <PrivateRoute>
              <Instructors />
            </PrivateRoute>
          }/>
        </Routes>
    </>
  )
}


export default App;
