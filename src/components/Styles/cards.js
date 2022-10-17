import styled from 'styled-components'

export const CardsContainer = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
// background: #8391a4;
`;
export const TeamContainer = styled.div`
  height:  fit-content;
  margin-top: 10px;
  padding: 10px;
  display:grid;
//   background: #8391a4;
`
export const CardsWrapper = styled.div `
max-width: 1000px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
align-items: center;
grid-gap: 16px;
/* padding:0 50px; */

@media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 760px) {
    grid-template-columns: 1fr 1fr;
    /* padding: 0 20px; */
}
`;
export const SingleCard = styled.div`
background-color:'#8bc34a';
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
border-radius: 10px;
max-height: 340px;
padding: 30px;
box-shadow: 0 1px 3px rgba(0,0,0,0.2);
transition: all 0.2s ease-in-out;

&:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
`;
export const CardsIcon = styled.img`
height: 160px;
width: 160px;
margin-bottom: 10px;
`;
export const CardsH1 = styled.h1`
font-size: 2.5rem;
color: #fff;
margin-bottom: 64px;

@media screen and (max-width: 480px) {
    font-size: 2rem;
}
`;

export const CardsH2 = styled.h2`
    font-size: 0.78rem;
margin-bottom: 10px;
`;
export const CardsP = styled.p`
font-size: 0.9rem;
text-align: center;
overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 190px;
`;