import React, { Component } from 'react'
import { getAllBookedLabByInstructorId, RemoveAppointmentByInstructorById } from '../ApiConfig/Api';
import { getId,dateFormat,timeFormat, DayIs } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'
import StudentBookedInfo from './StudentBookedInfo';
import { MdDeleteSweep } from 'react-icons/md';

import Swal from "sweetalert2";

import '../Styles/spinner.css'
let allStudents
export default class InstructorHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: [],
      selectedRef:false,
      students:[]
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByInstructorId(getId())
      .then((response) => {
        this.setState({ response: response.data })
      })
      .catch((error) => {
      })
  }
  removeBookedAppointment = (id, currentAppointment) => {
    RemoveAppointmentByInstructorById(id, currentAppointment)
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
    const { response } = this.state
    // if (getHoursDiff(new Date(currentBooking[index].From), new Date()) <= removeBookingLimit) Swal.fire({ icon: 'warning', title: "لايمكن حذف او تعديل الاختبار قبل 24 ساعة من موعده", confirmButtonText: 'موافق ', })
    // else {
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
          this.removeBookedAppointment(getId(), { BookingRefId: response[index]._id,Lab_id: response[index].Lab_id})
        }
      })
    // }
  }
  selectHandler = (index) =>{
    const {selectedRef,response} = this.state
    this.setState({selectedRef: !selectedRef,students: response[index]})
  }
  render() {
    const {response, selectedRef,students} = this.state
    if (response) {
      allStudents = (
        <StyledTable.TableContainer>
          <StyledTable.TableBodyContainer>
            <StyledTable.TableTr>
              <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
              <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
            </StyledTable.TableTr>
          </StyledTable.TableBodyContainer>
        </StyledTable.TableContainer>
      )
    }
    if (response) {
      if (response.length > 0) {
        allStudents = response.map((BookedLab, BookedLabIndex) => {
                return (
                  <StyledTable.TableTr className='single--icon' key={BookedLabIndex} onClick={()=>this.selectHandler(BookedLabIndex)}>
                    <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody">{BookedLab.LabCapacity}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody">{DayIs(BookedLab.From)}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody date-cell">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody date-cell">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody table--operation--container"><div onClick={() => this.removeAppointment(BookedLabIndex)} className='single--icon' > <MdDeleteSweep className='setting--icons' color='#ff5722' /></div>  </StyledTable.TableTd>

                  </StyledTable.TableTr>
                )
              })
            }
      }
    return (
      <div>
      {(!selectedRef)?<StyledTable.TableWithTitleWrapper><StyledTable.TableWrapper>
        <StyledTable.TableContainer>
          <StyledTable.TableHedContainer>
          </StyledTable.TableHedContainer>
          <StyledTable.TableHedContainer>
            <StyledTable.Tr>
              <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> الطاقة الاستيعابية</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> اليوم</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> ادارة الحجز</StyledTable.TableTh>

            </StyledTable.Tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableBodyContainer>
            {allStudents}
          </StyledTable.TableBodyContainer>
        </StyledTable.TableContainer>
      </StyledTable.TableWrapper >
      </StyledTable.TableWithTitleWrapper>
     :<StudentBookedInfo data={students} toggle={this.selectHandler}/>}
      </div>
    )
  }
}
