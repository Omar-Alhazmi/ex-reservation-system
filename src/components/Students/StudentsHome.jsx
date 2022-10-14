import React, { Component } from 'react'
import { getAllBookedLabByStudentId } from '../ApiConfig/Api';
import { getId,dateFormat,timeFormat } from '../helperMethods';
import * as StyledTable from '../Styles/styledTable'

import '../Styles/spinner.css'
export default class StudentsHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  componentDidMount() {
    // Mack API call 
    getAllBookedLabByStudentId(getId())
      .then((response) => {
        console.log(response);
        this.setState({ response: response.data.BookedExam })
      })

      .catch((error) => {
      })
  }
  render() {
    let   allExam = ""
    if (this.state.response) {
      allExam = (
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
        allExam = this.state.response.map((BookedLab, BookedLabIndex) => {
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
            {allExam}
          </StyledTable.TableBodyContainer>
        </StyledTable.TableContainer>
      </StyledTable.TableWrapper >
    )
  }
}
