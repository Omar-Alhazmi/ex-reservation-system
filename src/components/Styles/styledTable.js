import styled from 'styled-components'
export const TableWrapper = styled.div`
    // margin: 10px 70px 70px;
    box-shadow: 0px 0px 26px rgba( 0, 0, 0, 0.2 );
    @media (max-width: 767px) {
        margin: auto;
        &:before{
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
}
`
export const TableTitle = styled.h3`
    text-align: center;
    margin-bottom: 1rem;
`
export const TableWithTitleWrapper = styled.div`
    display: flow-root;
    width: 100%;
    padding: 2%;
    margin-top: 2%;
`
export const TableContainer = styled.table`
    border-radius: 5px;
    font-size: 12px;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
    // box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
    // margin-top: 12%;
    @media (max-width: 767px) {
    display: block;
        width: 100%;
 }
`

export const TableHedContainer = styled.thead`
    -webkit-box-shadow:-3px 6px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%), 0 1px 0px 0 rgb(0 0 0 / 0%);
    @media (max-width: 767px) {
        display: block;
        float: right;
    }
`
export const TableBodyContainer = styled.tbody`
@media (max-width: 767px) {
    display: block;
    width: auto;
    position: relative;
    overflow-x: auto;
}
`
export const TableTh = styled.th`
    text-align: center;
    padding: 8px;
    color: #ffffff;
    font-size: 1.2rem;
    background: #4FC3A1;
    &:nth-child(odd) {
    color: #ffffff;
    background: #324960;
}
@media (max-width: 767px) {
    display: block;
    &:last-child{
        border-bottom: none;
    }
    padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 1rem;
        text-overflow: ellipsis;
        text-align: center;
        border-bottom: 1px solid #f7f7f9;
        border-bottom: 1px solid #f7f7f9;
}
`
export const TableTd = styled.td`
    text-align: center;
    padding: 8px;
    border-left: 1px solid #f8f8f8;
    font-size: 0.90rem;
    @media (max-width: 767px) {
        padding: 20px .625em .625em .625em;
        height: 60px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
        &:nth-child(odd) {
        background: #F8F8F8;
        border-left: 1px solid #E6E4E4;
    }
    &:nth-child(even) {
        border-left: 1px solid #E6E4E4;
    }
        display: block;
    }
`
export const TableTr = styled.tr`

&:nth-child(even) {
    background: #F8F8F8;
}
@media (max-width: 767px) {
    display: table-cell;
&:nth-child(even) {
        background: transparent;
    }
    }
`
export const Tr = styled.tr`
@media (max-width: 767px) {
display: table-cell;
}
`

export const AcReButton = styled.button`
-webkit-appearance: none;
    background: -webkit-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);
    background: ${({Blue,halfBlue}) => (halfBlue ? 'linear-gradient(to right,#ff5722 0%,#2b5876 50%,#2b5876 100%)' : Blue ?  'linear-gradient(to right,#2778c4 0%,#2b5876 50%,#2b5876 100%)' : 'linear-gradient(to right,#f27474 0%,#ff5722 50%,#ff5722 100%)')};
    border-radius: 5rem;
    border:none;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    color: #fff;
    cursor: pointer;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0.05em;
    outline: none;
    min-width: 228px;
    -webkit-tap-highlight-color: transparent;
    &:hover {
  animation-name: gradient;
  -webkit-animation-name: gradient;
  animation-duration: 2s;
  -webkit-animation-duration: s;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  background: ${({Blue}) => (Blue ?'#2778c4' : '#f27474')};
  }
  @media (max-width: 767px) {
    margin: 1rem 0;
    padding: 1rem;
  }
`
export const ButtonContainer = styled.div`   
display: flex;
justify-content: space-around;
height: 4rem;
margin: 2rem;
@media (max-width: 767px) {
    display: grid; 
}
`