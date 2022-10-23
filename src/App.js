import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import InstructorNav from './components/Instructors/InstructorNav';
import InstructorSidebar from './components/Instructors/InstructorSidebar';
import InstructorHome from './components/Instructors/InstructorHome';
import AddStudent from './components/Instructors/AddStudent';
import SelectSubjectMod from './components/Instructors/SelectSubjectMod';

import ModeratorNave from './components/Moderator/ModeratorNave';
import Sidebar from './components/Moderator/ModeratorSidebar';
import Home from './components/Moderator/Home'
import InstructorsManagement from './components/Moderator/InstructorManagement/InstructorsManagement';
import LabsManagement from './components/Moderator/LabsManagement/LabManagement';
import StudentManagement from './components/Moderator/StudentManagement'
import { PrivateRouteInstructor, PrivateRouteModerator,PrivateRouteStudents } from './RouteManagement/PrivateRoutes';
import { Login } from './components/Login/Login';

import {StudentsNav} from './components/Students/StudentsNav'
import StudentsSide from './components/Students/StudentsSide'
import StudentsHome from './components/Students/StudentsHome'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRouteStudents />}>
        <Route element={<StudentsNav toggle={toggle} />} path="/Students">
          <Route element={<StudentsSide toggle={toggle} isOpen={isOpen} />} path="/Students">
            <Route element={<SelectSubjectMod />} path="ExamReservation" />
             <Route element={<StudentsHome />} path="Home" />
            {/* <Route element={<SelectSubjectMod />} path='SelectSubjectMod' /> */} 
          </Route>
          </Route>
        </Route>
        <Route element={<PrivateRouteInstructor />}>
        <Route element={<InstructorNav toggle={toggle} />} path="/Instructor">
          <Route element={<InstructorSidebar toggle={toggle} isOpen={isOpen} />} path="/Instructor">
            <Route element={<InstructorHome />} path="Home" />
            <Route element={<AddStudent />} path='AddStudent' />
            <Route element={<SelectSubjectMod />} path='LabBooking' />
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
