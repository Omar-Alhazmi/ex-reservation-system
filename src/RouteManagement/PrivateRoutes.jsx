import { Navigate, Outlet } from 'react-router-dom'
import { getInfo, checkStorage } from '../components/helperMethods';
import React from 'react'
const PrivateRouteInstructor = () => {
  let token;
  if (checkStorage() !== null && checkStorage() !== undefined) token = getInfo().data.Role === "Instructor"
  console.log(token);
  return (
    token ? <Outlet /> : <Navigate to='/' />
  )
}
const PrivateRouteStudents = () => {
  let token;
  if (checkStorage() !== null && checkStorage() !== undefined) token = getInfo().data.Role === "Students"
  return (
    token ? <Outlet /> : <Navigate to='/' />
  )
}
const PrivateRouteSysAdmin = () => {
  let token;
  if (checkStorage() !== null && checkStorage() !== undefined) token = getInfo().data.Role === "SysAdmin"
  return (
    token ? <Outlet /> : <Navigate to='/' />
  )
}
export { PrivateRouteInstructor,PrivateRouteStudents, PrivateRouteSysAdmin };