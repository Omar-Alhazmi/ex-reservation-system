import React from 'react'
import { SidebarContainer,Icon,CloseIcon, SidebarWrapper, SidebarMenu, SidebarLink,SideBtnWrap, SidebarRoute  } from '../Styles/SidebarElements';
import { Outlet } from 'react-router-dom'

const logout = (e) => {
    localStorage.clear();
    window.location.reload(false);
}

export default function StudentsSide({isOpen,toggle}){
  return (
    <>
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon onClick={toggle}>
       <CloseIcon />
    </Icon>
    <SidebarWrapper>
       <SidebarMenu>
       <SidebarLink to="/Students/Home" onClick={toggle}>الرئيسية </SidebarLink>
        <SidebarLink to="/Students/ExamReservation" onClick={toggle}>حجز اختبار</SidebarLink>
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
