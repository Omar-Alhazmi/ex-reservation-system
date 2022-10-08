import React from 'react'
import { SidebarContainer,Icon,CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink,SideBtnWrap, SidebarRoute  } from '../Styles/SidebarElements';
import { Outlet } from 'react-router-dom'

const logout = (e) => {
    localStorage.clear();
    window.location.reload(false);
}
export default function ModeratorSidebar({isOpen,toggle}) {
  return (
    <>
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon onClick={toggle}>
       <CloseIcon />
    </Icon>
    <SidebarWrapper>
       <SidebarMenu>
       <SidebarLink to="/Moderator/Home" onClick={toggle}>الرئيسية </SidebarLink>
        <SidebarLink to="/Moderator/LabsManagement" onClick={toggle} >ادارة المعامل </SidebarLink>
        <SidebarLink to="/Moderator/InstructorsManagement" onClick={toggle}>ادارة المدربين</SidebarLink>
        <SidebarLink to="/Moderator/StudentManagement" onClick={toggle}>ادارة المتدربين</SidebarLink>
       </SidebarMenu>
       <SideBtnWrap>
       <SidebarRoute  onClick={e => logout(e)}>تسجيل الخروج</SidebarRoute>
       </SideBtnWrap>
    </SidebarWrapper>
   </SidebarContainer>
   <Outlet />
   </>
  )
}
