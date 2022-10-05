import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Instructors from './components/Instructors/Instructors';
import ModeratorNave from './components/Moderator/ModeratorNave';
import Home from './components/Moderator/Home'
import InstructorsManagement from './components/Moderator/InstructorsManagement';
import LabsManagement from './components/Moderator/LabsManagement';
import StudentManagement from './components/Moderator/StudentManagement'
import { PrivateRouteInstructor, PrivateRouteModerator } from './RouteManagement/PrivateRoutes';
import { Login } from './components/Login/Login';
function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRouteInstructor />}>
          <Route element={<Instructors />} path="/Instructor" />
        </Route>
        <Route element={<PrivateRouteModerator isOpen={isOpen} toggle={toggle} />}>
          <Route element={<ModeratorNave />} path="/Moderator">
            <Route element={<Home />} path="Home" />
            <Route element={<LabsManagement />} path='LabsManagement' />
            <Route element={<InstructorsManagement />} path='InstructorsManagement' />
            <Route element={<StudentManagement />} path='StudentManagement' />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}


export default App;
