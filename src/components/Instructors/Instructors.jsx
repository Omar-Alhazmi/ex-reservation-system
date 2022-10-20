import React, { Component } from 'react'
import { getStudentsByInstructorId } from '../ApiConfig/Api';
import * as TableElement from '../Styles/styledTable';
import { getFullName, getId } from '../helperMethods'
import '../../App.css'
import '../Styles/searchBar.css';
export default class Instructors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      filteredData: [],
      searchIn: null
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
  handleSearchChange = (e, index) => {
    const { data } = this.state;
    const filteredData = data[index].Students.filter(Students => Students.FullName.includes(e.target.value) || Students.StudentId.includes(e.target.value))
    this.setState({ filteredData, searchIn: index })
  }
  dataSet = (students) => {
    return (
      students.map((currentStudent, stdIndex) => {
        return <TableElement.TableTr key={stdIndex}>
          <TableElement.TableTd>{currentStudent.StudentId}</TableElement.TableTd>
          <TableElement.TableTd>{currentStudent.FullName}</TableElement.TableTd>
          <TableElement.TableTd>{currentStudent.Phone}</TableElement.TableTd>
        </TableElement.TableTr>
      }))
  }
  render() {
    const { data, filteredData,searchIn } = this.state;
    let allDivision = "..."
    if (data.length !== 0) {
      allDivision = data.map((currentDiv, index) => {
        return <TableElement.TableWrapper className={this.props.hide ? 'hide' : 'display'} key={index}>
          <TableElement.TableContainer>
            <TableElement.TableHedContainer>
              <TableElement.TableTr>
                <TableElement.TableTh>رقم الشعبة</TableElement.TableTh>
                <TableElement.TableTh>المادة</TableElement.TableTh>
                <TableElement.TableTh className='search--body'><form
                  onSubmit={(e) => e.preventDefault()}
                  className='search--form'>
                  <label className='search--label' for="search">Search</label>
                  <input className='search--input' onChange={(e) => this.handleSearchChange(e, index)} id="search" type="search" pattern=".*\S.*" required />
                  <span class="caret"></span>
                </form></TableElement.TableTh>
              </TableElement.TableTr>
            </TableElement.TableHedContainer>
            <TableElement.TableBodyContainer>
              <TableElement.TableTr>
                <TableElement.TableTd>{currentDiv.DivisionId}</TableElement.TableTd>
                <TableElement.TableTd >{currentDiv.Subject}</TableElement.TableTd>
                <TableElement.TableTd >{`\t\t\t\t\t\t`}</TableElement.TableTd>
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
              {(filteredData.length > 0 && searchIn === index) ? this.dataSet(filteredData) : this.dataSet(currentDiv.Students)}
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
