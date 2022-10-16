import React, { Component } from 'react'
import * as StyledTable from '../Styles/styledTable'

export default class SummaryTable extends Component {
  render() {
    const {data } = this.props
    let allTimes = (
        <StyledTable.TableTr>
            <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
            <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
        </StyledTable.TableTr>)
    if (data) {
        if (data.length > 0) {
            allTimes = data.map((data, index) => {
                return (
                    <StyledTable.TableTr key={index}>
                        <StyledTable.TableTd className="tableBody">{data.FullName}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{data.InstructorReference.length}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{data.TeachStudents.length}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{data.BookingRef.length}</StyledTable.TableTd>
                    </StyledTable.TableTr>
                )
            })
        }
    }
    return (
        <>
            <StyledTable.TableWrapper>
                <StyledTable.TableContainer>
                    <StyledTable.TableHedContainer>
                        <tr>
                            <StyledTable.TableTh className="tableHeader">اسم المدرب</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader"> عدد الشعب</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader"> عدد المتدربين</StyledTable.TableTh>
                            <StyledTable.TableTh className="tableHeader"> عدد المواعيد المحجوزة</StyledTable.TableTh>
                        </tr>
                    </StyledTable.TableHedContainer>
                    <StyledTable.TableBodyContainer>
                        {allTimes}
                    </StyledTable.TableBodyContainer>
                </StyledTable.TableContainer>
            </StyledTable.TableWrapper>
        </>
    )
}
}
