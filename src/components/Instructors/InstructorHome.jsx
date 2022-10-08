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
            allStudents = response.data.Students.map((data, index) => {
              return (
                <StyledTable.TableTr key={index}>
                  <StyledTable.TableTd className="tableBody">{data.StudentId}</StyledTable.TableTd>
                  <StyledTable.TableTd className="tableBody">{data.FullName}</StyledTable.TableTd>
                  <StyledTable.TableTd className="tableBody">{data.Phone}</StyledTable.TableTd>
                </StyledTable.TableTr>
              )
            })
            this.setState({response: true})
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
      <StyledTable.TableTr>
        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
        <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
      </StyledTable.TableTr>)
    }
    // if (this.state.response) {
    //   if (this.state.response.length > 0) {
    //     allStudents = this.state.response.Students.map((data, index) => {
    //       return (
    //         <StyledTable.TableTr key={index}>
    //           <StyledTable.TableTd className="tableBody">{data.StudentId}</StyledTable.TableTd>
    //           <StyledTable.TableTd className="tableBody">{data.FullName}</StyledTable.TableTd>
    //           <StyledTable.TableTd className="tableBody">{data.Phone}</StyledTable.TableTd>
    //         </StyledTable.TableTr>
    //       )
    //     })
    //   }
    // }
    return (
      <StyledTable.TableWrapper>
        <StyledTable.TableContainer>
          <StyledTable.TableHedContainer>
            <tr>
              <StyledTable.TableTh className="tableHeader"> الرقم الاكاديمي</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> اسم المتدرب</StyledTable.TableTh>
              <StyledTable.TableTh className="tableHeader"> رقم الجوال</StyledTable.TableTh>
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
