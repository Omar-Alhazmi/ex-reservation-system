import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import InstructorNave from './components/Instructors/InstructorNave';
import InstructorSidebar from './components/Instructors/InstructorSidebar';
import InstructorHome from './components/Instructors/InstructorHome';
import AddStudent from './components/Instructors/AddStudent';
import LabBooking from './components/Instructors/SelectSubjectMod';

import ModeratorNave from './components/Moderator/ModeratorNave';
import Sidebar from './components/Moderator/ModeratorSidebar';
import Home from './components/Moderator/Home'
import InstructorsManagement from './components/Moderator/InstructorsManagement';
import LabsManagement from './components/Moderator/LabsManagement/LabManagement';
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
        <Route element={<InstructorNave toggle={toggle} />} path="/Instructor">
          <Route element={<InstructorSidebar toggle={toggle} isOpen={isOpen} />} path="/Instructor">
            <Route element={<InstructorHome />} path="Home" />
            <Route element={<AddStudent />} path='AddStudent' />
            <Route element={<LabBooking />} path='LabBooking' />
          </Route>
          </Route>
        </Route>
        <Route element={<PrivateRouteModerator />}>
          <Route element={<ModeratorNave toggle={toggle} />} path="/Moderator">
          <Route element={<Sidebar toggle={toggle} isOpen={isOpen} />} path="/Moderator">
            <Route element={<Home />} path="Home" />
            <Route element={<LabsManagement />} path='LabsManagement' />
            <Route element={<InstructorsManagement />} path='InstructorsManagement' />
            <Route element={<StudentManagement />} path='StudentManagement' />
          </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}


export default App;
