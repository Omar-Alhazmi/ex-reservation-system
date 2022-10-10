import React, { Component } from 'react'
import { getAllBookedLabByInstructorId } from '../ApiConfig/Api';
import { getId,dateFormat,timeFormat } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'

import '../Styles/spinner.css'
let allStudents
export default class InstructorHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: false
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByInstructorId(getId())
      .then((response) => {
        console.log(response);
        this.setState({ response: response.data })
      })
      // console.log(response);
      // this.setState({ response: response.data});
      // })
      .catch((error) => {
      })
  }
  render() {
    if (this.state.response) {
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
    if (this.state.response) {
      if (this.state.response.length > 0) {
        allStudents = this.state.response.map((BookedLab, BookedLabIndex) => {
                return (
                  <StyledTable.TableTr key={BookedLabIndex}>
                    <StyledTable.TableTd className="tableBody">{BookedLab.LabReference}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody">{BookedLab.LabCapacity}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody">{dateFormat(BookedLab.From)}</StyledTable.TableTd>
                    <StyledTable.TableTd className="tableBody">{`${timeFormat(BookedLab.From)} - ${timeFormat(BookedLab.To)}`}</StyledTable.TableTd>
                  </StyledTable.TableTr>
                )
              })
            }
      }
    return (
      <StyledTable.TableWrapper>
        <StyledTable.TableContainer>
          <StyledTable.TableHedContainer>
          </StyledTable.TableHedContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> رقم القاعة</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> الطاقة الاستيعابية</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> التاريخ</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> الوقت</StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableBodyContainer>
            {allStudents}
          </StyledTable.TableBodyContainer>
        </StyledTable.TableContainer>
      </StyledTable.TableWrapper >
    )
  }
}