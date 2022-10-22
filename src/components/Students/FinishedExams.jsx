import React from 'react'
import * as StyledTable from '../Styles/styledTable'
import { dateFormat, timeFormat, DayIs } from '../helperMethods';

export default function FinishedExams({finishedExam}) {
    let allExam = ""
    if (finishedExam) {
        allExam = (
            <StyledTable.TableTr>
                <StyledTable.TableTd colSpan={5} className="tableBody">لايوجد اختبارات محجوزة</StyledTable.TableTd>
            </StyledTable.TableTr>
        )
    }
    if (finishedExam) {
        if (finishedExam.length !== 0) {
            allExam = finishedExam.map((BookedLab, BookedLabIndex) => {
                return (
                    <StyledTable.TableTr className='finished--exam' key={BookedLabIndex}>
                        <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{BookedLab.For}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody">{DayIs(BookedLab.From)}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody date-cell">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
                        <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
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
                    </StyledTable.TableHedContainer>
                    <StyledTable.TableHedContainer>
                        <tr>
                            <StyledTable.TableTh className="finished--ex--heder tableHeader"> رقم القاعة</StyledTable.TableTh>
                            <StyledTable.TableTh className="finished--ex--heder tableHeader"> المادة </StyledTable.TableTh>
                            <StyledTable.TableTh className="finished--ex--heder tableHeader"> اليوم</StyledTable.TableTh>
                            <StyledTable.TableTh className="finished--ex--heder tableHeader"> التاريخ</StyledTable.TableTh>
                            <StyledTable.TableTh className="finished--ex--heder tableHeader"> الوقت</StyledTable.TableTh>
                        </tr>
                    </StyledTable.TableHedContainer>
                    <StyledTable.TableBodyContainer>
                        {allExam}
                    </StyledTable.TableBodyContainer>
                </StyledTable.TableContainer>
            </StyledTable.TableWrapper>
        </>
    )
}
