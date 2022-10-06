import styled from 'styled-components'
import { NavLink } from 'react-router-dom'



export const Nav = styled.nav`

background: ${({ scrollNav }) => (scrollNav ? '#c6e4d1' : 'transparent')};
height: 103px;
/* margin-top: -80px; */
display: flex;
-webkit-flex-direction: column; 
  flex-direction: column; 
  padding: 0;
  margin: 0;
  list-style: none;
  -ms-box-orient: horizontal;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -moz-flex;
  display: -webkit-flex;
  display: flex;
justify-content: right;
align-items: right;
font-size: 1rem;
position: sticky;
top: 0;
z-index: 10;
@media screen and (max-width:960px){
     transition: 0.8s all ease;
     display: grid;
    justify-content: center;
    margin: 17px 0;
}`;
export const NavContainer = styled.div`
display: flex;
justify-content: space-between;
height: 103px;
z-index: 1;
width: -webkit-fill-available;
padding: 0 24px;
max-width: 1387px; `;

export const NavLogo = styled(NavLink)`
color: #fff;
justify-self: flex-end;
cursor: pointer;
font-size:1.5rem;
display: flex;
align-items: center;
margin-right: 24px;
font-weight: bold;
text-decoration: none;

`;
export const Image = styled.img`
    width: ${({ scrollNav }) => (scrollNav ? `100px` : `227px`)};
    margin: auto;
    @media screen and (max-width:960px){
        width: 130px;
        display: grid;
    justify-content: center;
        }
    `

export const ResponsiveIcon = styled.div`
display:none;
@media screen and (max-width: 769px){
    display: grid;
    position: absolute;
    color: #607d8b;
    top: 0;
    right: 0;
    transform: translate(-100%,60%); 
    font-size: 1.8rem;
    cursor: pointer;
}`;

export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style: none;
text-align: center;
margin: revert;
background-color: #efefef;
border-radius: 50px;
padding: 0 10px;
color: #607d8b;
@media screen and (max-width:769px){
    display:none;
}`;

export const NavItem = styled.li`
`;

export const NavLinks = styled(NavLink)`
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
color: #23bbc8;
&:hover{
  color: #636467;
}
&.active{
    border-bottom: 2px solid #607d8b;
}`;


export const LogoutContainer = styled.div`
    display: flex;
    height: fit-content;
    justify-content: flex-end;
    height: auto;
@media screen and (max-width: 769px) {
    display: none;
}`
export const Logout = styled.button`
height: fit-content;
align-self: center;
border-radius: 50px;
white-space: nowrap;
padding: 10px 22px;
text-align:left;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
color: #3EC1B9;
&:hover{
  color: #B38533;
}
`