import React from 'react'
import { HashRouter as Router,Routes, Route } from 'react-router-dom';
import Instructors from './components/Instructors/Instructors';
import  {PrivateRouteInstructor} from './RouteManagement/PrivateRoutes';
import { Login } from './components/Login/Login';
function App() {

  return (
    <Router>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRouteInstructor />}>
          <Route element={<Instructors />} path="/Instructor" />
        </Route>
      </Routes>
    </Router>
  )
}


export default App;
