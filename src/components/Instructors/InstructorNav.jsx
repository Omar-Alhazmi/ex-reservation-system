import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import * as MainHeader from '../Styles/MainHeaderStyle'
import { animateScroll as scroll } from 'react-scroll';
import logo from '../Images/logo.png'
import { Outlet } from 'react-router-dom'
import '../../App.css'
const InstructorNav = ({ toggle }) => {
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
                        <MainHeader.NavLogo to='/Instructor/Home' onClick={toggleHandler}><MainHeader.Image scrollNav={scrollNav} duration={500} src={logo} alt="" /> </MainHeader.NavLogo>
                        <MainHeader.ResponsiveIcon onClick={toggle}>
                            <FaBars className="FaBarsIcon" />
                        </MainHeader.ResponsiveIcon>
                        <MainHeader.NavMenu>
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to={'/Instructor/AddStudent'}
                                    duration={500}
                                   offset={-80}
                                >اظافة متدرب</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            {/* | */}
                            <MainHeader.NavItem>
                                <MainHeader.NavLinks
                                    to={'/Instructor/LabBooking'}
                                    smooth={true.toString()}
                                    duration={500}
                                    spy={true.toString()}
                                    exact={true.toString()}
                                   offset={-80}
                                > حجز القاعات</MainHeader.NavLinks>
                            </MainHeader.NavItem>
                            {/* | */}
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
            <Outlet />
        </>
    )
}
export default InstructorNav