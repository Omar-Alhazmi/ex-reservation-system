import React, { Component } from 'react'
import { getStudentsByInstructorId } from '../ApiConfig/Api';
import { getId } from '../helperMethods'
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
    getStudentsByInstructorId(getId())
      .then((response) => {
        this.setState({ response: response.data })
      })
      // console.log(response);
      // this.setState({ response: response.data});
      // })
      .catch((error) => {
      })
  }
  render() {
    if (!this.state.response) {
      allStudents = (
        <StyledTable.TableContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> رقم الشعبة</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"><div class="spinner tableSp">Loading...</div></StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> الرقم الاكاديمي</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> رقم الجوال</StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
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
        allStudents = this.state.response.map((headers, index) => {
          console.log(headers);
          return (
            <StyledTable.TableContainer key={index}>
               <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> رقم الشعبة</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader">{headers.DivisionId}</StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> الرقم الاكاديمي</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> رقم الجوال</StyledTable.TableTh>
            </tr>
          </StyledTable.TableHedContainer>
          <StyledTable.TableBodyContainer>
              {headers.Students.map((data, dataIndex) => {
                return ( 
                <StyledTable.TableTr key={dataIndex}>
                  <StyledTable.TableTd className="tableBody">{data.StudentId}</StyledTable.TableTd>
                  <StyledTable.TableTd className="tableBody">{data.FullName}</StyledTable.TableTd>
                  <StyledTable.TableTd className="tableBody">{data.Phone}</StyledTable.TableTd>
                </StyledTable.TableTr>
                )
              })}
              </StyledTable.TableBodyContainer>
            </StyledTable.TableContainer>
          )
        })
      }
    }
    return (
      <StyledTable.TableWrapper>
        {allStudents}
      </StyledTable.TableWrapper >
    )
  }
}
