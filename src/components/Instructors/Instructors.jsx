import React, { Component } from 'react'
import { getStudentsByInstructorId } from '../ApiConfig/Api';
import * as TableElement from '../Styles/styledTable';
import { getFullName,getId } from '../helperMethods'
import '../../App.css'
export default class Instructors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }
  componentDidMount() {
    getStudentsByInstructorId(getId())
      .then(response => {
        console.log(response);
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    const { data } = this.state;
    let allDivision = "..."
    if (data.length !== 0) {
      allDivision = data.map((currentDiv, index) => {
        return <TableElement.TableWrapper className={this.props.hide?  'hide' : 'display'} key={index}>
          <TableElement.TableContainer>
            <TableElement.TableHedContainer>
              <TableElement.TableTr>
                <TableElement.TableTh>رقم الشعبة</TableElement.TableTh>
                <TableElement.TableTh colSpan={2}>المادة</TableElement.TableTh>
              </TableElement.TableTr>
            </TableElement.TableHedContainer>
            <TableElement.TableBodyContainer>
              <TableElement.TableTr>
                <TableElement.TableTd>{currentDiv.DivisionId}</TableElement.TableTd>
                <TableElement.TableTd colSpan={2}>{currentDiv.Subject}</TableElement.TableTd>
              </TableElement.TableTr>
            </TableElement.TableBodyContainer>
            <TableElement.TableHedContainer>
              <TableElement.TableTr>
                <TableElement.TableTh> الرقم الاكاديمي</TableElement.TableTh>
                <TableElement.TableTh>اسم المتدرب</TableElement.TableTh>
                <TableElement.TableTh>الجوال</TableElement.TableTh>
              </TableElement.TableTr>
            </TableElement.TableHedContainer>
            <TableElement.TableBodyContainer>
              {currentDiv.Students.map((currentStudent, stdIndex) => {
                return <TableElement.TableTr key={stdIndex}>
                  <TableElement.TableTd>{currentStudent.StudentId}</TableElement.TableTd>
                  <TableElement.TableTd>{currentStudent.FullName}</TableElement.TableTd>
                  <TableElement.TableTd>{currentStudent.Phone}</TableElement.TableTd>
                </TableElement.TableTr>
              })}
            </TableElement.TableBodyContainer>
          </TableElement.TableContainer>
        </TableElement.TableWrapper>
      })
    }
    return (
      <div>
        <div>
          <h3 className='display--name'>
            {getFullName()}
          </h3>
        </div>
        {allDivision}
      </div>
    )
  }
}
