import styled from 'styled-components'

export const LabelContainer = styled.div`
@media (min-width: 950px) {
    display: flex;
    justify-content: center;
    align-items: center;
}
`
export const DoughnutContainer = styled.div`
display: grid;
height: 375px; 
 width: 375px;
 @media screen and (max-width: 600px) {
      display: grid;
      margin:auto;
      width: 75vw;
      height: fit-content;
    }
`
export const DoughnutContainerLear2 = styled.div`
display: grid;
margin:auto;
@media screen and (max-width: 600px) {
    width: 75vw;
}
`
export const DoughnutTitle = styled.label`
text-align: center;
border-bottom: 1px solid gray;
color: darkslategray;
`
export const LabelCard = styled.div`
  border-top: 3px solid ${({greenLine,yellowLine,blueLine,orangeLine}) => (greenLine ? '#45d3d3' : 
                                                    yellowLine ? '#fcaf4a' : blueLine ? "#35c0ff"
                                                    :orangeLine?'#ff5722':'#000')};
    border-radius: 5px;
    box-shadow: 0px 30px 40px -20px hsl(229, 6%, 66%);
    padding: 30px;
    margin: 20px; 
    text-align: center;
        height: 133px;
        width: 254px;
    color:${({white}) => (white ? '#ffff' : '#0000')};
    background-color:${({green,gray,darkBlue,darkGreen}) => (green ? '#00968857' : gray ? '#636467 ': darkBlue ? '#528fa7' :darkGreen? '#157c79':'#000')};
    &:hover{
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
@media (max-width: 450px) {
        height: 200px;
        margin: 10vw 0px;
}
@media (max-width: 300px){
    width: none;
}
`
export const CardHeadLine = styled.h2`
    color:${({white}) => (white ? '#ffff' : '#0000')};
        font-weight: 600;
        font-size: 1.5rem;
        line-height: none!important;
            margin: auto;
@media (max-width:1024px) {
        line-height: none;
            margin: auto;}
`
export const CardParagraph = styled.p`
        font-weight: 600;
        font-size: 1.5rem;
        line-height: none!important;
            margin: auto;
@media (max-width:1024px) {
        line-height: none;
            margin: auto;}
`
export const TableContainer = styled.div`
   justify-content:center;
   align-items:center;
    width: 69%;
    margin: auto;
    margin-top: 59px;
    margin-bottom: 58px;
    position: relative;
  max-height:  300px;
  overflow: scroll;
  box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
@media (max-width: 702px){
    width: 100%; 
}
`
export const LabelsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media screen and (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        justify-content: space-between;
        justify-items: center;

`
export const ChartContainer = styled.div`
    display: flex;
      align-items: center;
      justify-content: center;
      align-content: space-around;
      flex-wrap: wrap;
      box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
      @media screen and (max-width: 600px) {
      display: grid;
      border:none;
      }
`