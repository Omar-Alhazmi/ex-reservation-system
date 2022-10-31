import React, { Component } from 'react'
import { getStudentsByInstructorId } from '../ApiConfig/Api';
import * as TableElement from '../Styles/styledTable';
import { getFullName, getId } from '../helperMethods'
import IncreaseStudentAttempt from './IncreaseStudentAttempt'
import '../../App.css'
import '../Styles/searchBar.css';
export default class Instructors extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      filteredData: [],
      searchIn: null,
      toggle: false,
      updateStudent: {
        For: "",
        id: "",
      }
    }
  }
  componentDidMount() {
    getStudentsByInstructorId(getId())
      .then(response => {
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
  handleStudentAttempt = (id, For) => {
    this.setState({ updateStudent: { id, For } })
    this.toggleHandler()
  }
  toggleHandler = () => {
    const { toggle } = this.state;
    this.setState({ toggle: !toggle })
  }
  dataSet = (students, currentDiv) => {
    return (
      students.map((currentStudent, stdIndex) => {
        return <TableElement.TableTr className='single--icon' key={stdIndex} onClick={() => this.handleStudentAttempt(currentStudent._id, currentDiv.Subject)}>
          <TableElement.TableTd>{currentStudent.StudentId}</TableElement.TableTd>
          <TableElement.TableTd>{currentStudent.FullName}</TableElement.TableTd>
          <TableElement.TableTd>{currentStudent.Phone}</TableElement.TableTd>
          {(currentStudent.DoneTestOn.length !== 0) ? currentStudent.DoneTestOn.map((currentSubject ,index)=> { return <TableElement.TableTd key={index}>{(currentSubject.subject === currentDiv.Subject) ? currentSubject.AttemptsCount : 0}</TableElement.TableTd> }) : <TableElement.TableTd>{0}</TableElement.TableTd>}
        </TableElement.TableTr>
      }))
  }
  render() {
    const { data, filteredData, searchIn, toggle, updateStudent } = this.state;
    let allDivision = "..."
    if (data.length > 0) {
      allDivision = data.map((currentDiv, index) => {
        return (
          <TableElement.TableWithTitleWrapper className={this.props.hide ? 'hide' : 'display'} key={index} >
            <TableElement.TableWrapper>
              <TableElement.TableContainer>
                <TableElement.TableHedContainer>
                  <TableElement.TableTr>
                    <TableElement.TableTh>رقم الشعبة</TableElement.TableTh>
                    <TableElement.TableTh>المادة</TableElement.TableTh>
                    <TableElement.TableTh colSpan={2} className='search--body'>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className='search--form'>
                        <label className='search--label' for="search">Search</label>
                        <input className='search--input' onChange={(e) => this.handleSearchChange(e, index)} id="search" type="search" pattern=".*\S.*" required />
                        <span class="caret"></span>
                      </form>
                    </TableElement.TableTh>
                  </TableElement.TableTr>
                </TableElement.TableHedContainer>
                <TableElement.TableBodyContainer>
                  <TableElement.TableTr>
                    <TableElement.TableTd>{currentDiv.DivisionId}</TableElement.TableTd>
                    <TableElement.TableTd >{currentDiv.Subject}</TableElement.TableTd>
                    <TableElement.TableTd >{`\t\t\t\t\t\t`}</TableElement.TableTd>
                    <TableElement.TableTd >{`\t\t\t\t\t\t`}</TableElement.TableTd>
                  </TableElement.TableTr>
                </TableElement.TableBodyContainer>
                <TableElement.TableHedContainer>
                  <TableElement.TableTr>
                    <TableElement.TableTh> الرقم الاكاديمي</TableElement.TableTh>
                    <TableElement.TableTh>اسم المتدرب</TableElement.TableTh>
                    <TableElement.TableTh>الجوال</TableElement.TableTh>
                    <TableElement.TableTh>عدد المحاولات</TableElement.TableTh>
                  </TableElement.TableTr >
                </TableElement.TableHedContainer>
                <TableElement.TableBodyContainer>
                  {(filteredData.length > 0 && searchIn === index) ? this.dataSet(filteredData, currentDiv) : this.dataSet(currentDiv.Students, currentDiv)}
                </TableElement.TableBodyContainer>
              </TableElement.TableContainer>
            </TableElement.TableWrapper>
          </TableElement.TableWithTitleWrapper>
        )
      })
    }
    return (
      <div>
        <div>
          <h3 className='display--name'>
            {getFullName()}
          </h3>
        </div>
        {(toggle) ? <IncreaseStudentAttempt data={updateStudent} toggle={()=>this.toggleHandler()}/> : ""}
        {allDivision}
      </div>
    )
  }
}
