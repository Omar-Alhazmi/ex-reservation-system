import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import * as MainHeader from '../Styles/MainHeaderStyle'
import { animateScroll as scroll } from 'react-scroll';
import logo from '../Images/logo.png'
import logo_2 from '../Images/Logo_Used.png'

import { Outlet } from 'react-router-dom'
import { getFullName } from '../helperMethods';
import '../../App.css'
const ModeratorNave = ({ toggle }) => {
    const [scrollNav, setScroll] = useState(false);
    const navOnChange = () => {
        if (window.scrollY >= 30) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', navOnChange);
    }, []);
    const toggleHandler = () => {
        scroll.scrollToTop();
    };
    const logout = (e) => {
        localStorage.clear();
        window.location.reload(false);
    }
    return (
        <>
            <IconContext.Provider value={{ color: '#607d8b' }}>
                <MainHeader.Nav scrollNav={scrollNav}>
                    <MainHeader.NavContainer >
                        <MainHeader.NavLogo to='/Moderator/Home' onClick={toggleHandler}><MainHeader.Image scrollNav={scrollNav} duration={500} src={(scrollNav) ? logo_2 : logo} alt="" /> </MainHeader.NavLogo>
                        <MainHeader.ResponsiveIcon onClick={toggle}>
                            <FaBars className="FaBarsIcon" />
                        </MainHeader.ResponsiveIcon>
                        <MainHeader.NavMenu>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to={'/Moderator/LabsManagement'}
                                    duration={500}
                                    offset={-80}
                                >ادارة المعامل</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            |
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to={'/Moderator/InstructorsManagement'}
                                    smooth={true.toString()}
                                    duration={500}
                                    spy={true.toString()}
                                    exact={true.toString()}
                                    offset={-80}
                                >ادارة المدربين</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            |
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to="/Moderator/StudentManagement"
                                    smooth={true.toString()}
                                    duration={500}
                                    spy={true.toString()}
                                    exact={true.toString()}
                                    offset={-80}
                                >ادارة المتدربين</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                        </MainHeader.NavMenu>
                        <MainHeader.LogoutContainer>
                            <MainHeader.Logout
                                duration={500}
                                spy={true.toString()}
                                exact={true.toString()}
                                onClick={e => logout(e)}>
                                تسجيل الخروج
                            </MainHeader.Logout>
                        </MainHeader.LogoutContainer>
                    </MainHeader.NavContainer>
                </MainHeader.Nav>
            </IconContext.Provider>
            <div>
                <h3 className='display--name'>
                    {getFullName()}
                </h3>
            </div>
            <Outlet />
        </>
    )
}
export default ModeratorNave