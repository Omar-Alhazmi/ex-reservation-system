import React, { Component } from 'react'
import { getAllBookedLabByStudentId, RemoveExamBookedByStudentId, expiredAppointment } from '../ApiConfig/Api';
import { getId, dateFormat, timeFormat, getHoursDiff, DayIs, getInfo } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'
import { MdDeleteSweep } from 'react-icons/md';
import FinishedExams from './FinishedExams'
import Swal from "sweetalert2";

import '../Styles/spinner.css'
export default class StudentsHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBooking: [],
      removeBookingLimit: 24,
      finishedExam: [],
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByStudentId(getId())
      .then((response) => {
        console.log(response);
        this.setState({ currentBooking: response.data.currentBooking, finishedExam: response.data.finishedExam })
      })

      .catch((error) => {
      })
    expiredAppointment();
  }
  removeBookedAppointment = (id, currentAppointment) => {
    RemoveExamBookedByStudentId(id, currentAppointment)
      .then(response => {
        if (response.status === 200) {
          Swal.fire({ icon: 'success', title: response.data.message });
          window.location.reload(false);
        }
      }).catch(error => {
        if (error.response.status === 405) Swal.fire({ icon: 'warning', title: error.response.data.message });
        else { Swal.fire({ icon: 'error', title: `حدث خطا` }) }
      })
  }
  removeAppointment = (index) => {
    const { currentBooking, removeBookingLimit } = this.state
    if (getHoursDiff(new Date(currentBooking[index].From), new Date()) <= removeBookingLimit) Swal.fire({ icon: 'warning', title: "لايمكن حذف او تعديل الاختبار قبل 24 ساعة من موعده", confirmButtonText: 'موافق ', })
    else {
      Swal.fire({
        title: 'تأكيد الحذف',
        text: "سيتم حذف الموعد نهائيا",
        icon: 'warning',
        showDenyButton: true,
        confirmButtonColor: '#d33',
        denyButtonColor: '#3085d6',
        confirmButtonText: 'نعم, تأكيد الحذف  ',
        denyButtonText: `رجوع`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeBookedAppointment(getId(), { BookingRefId: currentBooking[index]._id })
        }
      })
    }
  }

  render() {
    const { currentBooking, finishedExam } = this.state
    let allExam = (
      <StyledTable.TableTr>
        <StyledTable.TableTd colSpan={5} className="tableBody">لايوجد اختبارات محجوزة</StyledTable.TableTd>
      </StyledTable.TableTr>
    )
    if (currentBooking) {
      if (currentBooking.length !== 0) {
        allExam = currentBooking.map((BookedLab, BookedLabIndex) => {
          return (
            <StyledTable.TableTr key={BookedLabIndex}>
              <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody">{BookedLab.For}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody">{DayIs(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
              {(getInfo().data.DoneTestOn && getInfo().data.DoneTestOn.length !== 0) ?
                getInfo().data.DoneTestOn.map(currentSubject => {
                  return <StyledTable.TableTd className="tableBody">{(currentSubject.subject === BookedLab.For) ? 3 - currentSubject.AttemptsCount : 2}</StyledTable.TableTd>
                }) : <StyledTable.TableTd className="tableBody">2</StyledTable.TableTd>}
              <StyledTable.TableTd className="tableBody table--operation--container"><div onClick={() => this.removeAppointment(BookedLabIndex)} className='single--icon' > <MdDeleteSweep className='setting--icons' color='#ff5722' /></div>  </StyledTable.TableTd>
            </StyledTable.TableTr>
          )
        })
      }
    }
    return (
      <>
        <StyledTable.TableWithTitleWrapper>
          <StyledTable.TableTitle>اختبارات قادمة</StyledTable.TableTitle>
          <StyledTable.TableWrapper>
            <StyledTable.TableContainer>
              <StyledTable.TableHedContainer>
              </StyledTable.TableHedContainer>
              <StyledTable.TableHedContainer>
                <StyledTable.TableTr>
                  <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> المادة </StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> اليوم</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader">المحاولات المتبقية</StyledTable.TableTh>
                  <StyledTable.TableTh className="tableHeader"> ادارة الحجز</StyledTable.TableTh>
                </StyledTable.TableTr>
              </StyledTable.TableHedContainer>
              <StyledTable.TableBodyContainer>
                {allExam}
              </StyledTable.TableBodyContainer>
            </StyledTable.TableContainer>
          </StyledTable.TableWrapper>
        </StyledTable.TableWithTitleWrapper>
        {(finishedExam.length > 0) ?
          <StyledTable.TableWithTitleWrapper>
            <StyledTable.TableTitle>اختبارات تم الانتهاء منها</StyledTable.TableTitle>
            <FinishedExams finishedExam={finishedExam} />
          </StyledTable.TableWithTitleWrapper>
          : ""}
      </>
    )
  }
}
