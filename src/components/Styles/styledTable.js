import styled from 'styled-components'
export const TableWrapper  = styled.div`
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
    @media (max-width: 767px) {
        &:before{
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
}
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
    box-shadow: 0px 35px 50px rgba( 0, 0, 0, 0.2 );
    margin-top: 12%;
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
        font-size: 13px;
        text-overflow: ellipsis;
        text-align: right;
        border-bottom: 1px solid #f7f7f9;
        text-align: right;
        border-bottom: 1px solid #f7f7f9;
}
`
export const TableTd = styled.td`
    text-align: right;
    padding: 8px;
    border-left: 1px solid #f8f8f8;
    font-size: 12px;
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
&:nth-child(even) {
        background: transparent;
    }
    }
`
export const AcReButton =styled.button`
-webkit-appearance: none;
    padding: 6%;
    background: -webkit-gradient(to right, #a2ccb6 0%, #fceeb5 50%, #ee786e 100%);
    background: linear-gradient(to right, #4e4376, #2b5876);
    border-radius: 5rem;
    border:none;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    color: #fff;
    cursor: pointer;
    color: #fff;
    cursor: pointer;
    font: 1.5em Raleway, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 3rem;
    letter-spacing: 0.05em;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: fit-content;
    justify-self: center;
    margin-top: 10%;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
    margin: 5%;
    &:hover {
  animation-name: gradient;
  -webkit-animation-name: gradient;
  animation-duration: 2s;
  -webkit-animation-duration: s;
  animation-iteration-count: 1;
  -webkit-animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  background: #c6e4d1;
  }
`