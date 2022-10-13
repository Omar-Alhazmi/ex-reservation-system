import { Navigate, Outlet } from 'react-router-dom'
import { getInfo, checkStorage } from '../components/helperMethods';
import React from 'react'
let token = null;
console.log(getInfo().data.StudentId );
if (checkStorage()) token = getInfo().data.Role
const PrivateRouteInstructor = () => {
  return (
    token === "Instructor" ? <Outlet /> : <Navigate to='/' />
  )
}
const PrivateRouteStudents = () => {
  return (
    (getInfo().data.StudentId !== null || getInfo().data.StudentId !== undefined) ? <Outlet /> : <Navigate to='/' />
  )
}
const PrivateRouteModerator = () => {
  return (
    token === "SysAdmin" ? <Outlet /> : <Navigate to='/' />
  )
}
export { PrivateRouteInstructor, PrivateRouteStudents, PrivateRouteModerator };