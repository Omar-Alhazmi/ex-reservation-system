import React, { Component } from 'react'
import * as StyledTable from '../../Styles/styledTable'
import {getAllStudents} from '../../ApiConfig/Api';
export default class SearchForStudent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         students:[],
         filteredData:[]
      }
    }
    componentDidMount(){
        getAllStudents()
        .then(response =>{
            this.setState({students: response.data})
        })
    }
    handleSearchChange = (e) => {
        const { students } = this.state;
        console.log(e.target.value);
        const filteredData = students.filter(Students => Students.FullName.includes(e.target.value) || Students.StudentId.includes(e.target.value))
        this.setState({filteredData})
        if(e.target.value === "")         this.setState({filteredData:[]})
      }
    render() {
        const {filteredData} = this.state
        let StudentFound = <StyledTable.TableTr>
        <StyledTable.TableTd className="tableBody">لايجوجد بيانات تطابق البحث</StyledTable.TableTd>
    </StyledTable.TableTr>
    if(filteredData.length !== 0)
    {
        StudentFound =  filteredData.map((student,index)=>{
            return <StyledTable.TableTr kye={index}>
                <StyledTable.TableTd className="tableBody">{student.FullName}</StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody">{student.StudentId}</StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody">{student.Phone}</StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody">{student.StudentReference.map((element,BrIndex) => {return <div key={BrIndex}> {element} <br/></div>})}</StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody">{student.Subject.map((element,BrIndex) => {return <div key={BrIndex}> {element} <br/></div>})}</StyledTable.TableTd>
            </StyledTable.TableTr>
        })
    }
        return (
            <div>
                  <StyledTable.TableWithTitleWrapper>
                  <form
                  onSubmit={(e) => e.preventDefault()}
                  className='search--form'>
                  <label className='search--label' for="search">Search</label>
                  <input className='search--input' onChange={(e) => this.handleSearchChange(e)} id="search" type="search" pattern=".*\S.*" required />
                  <span class="caret"></span>
                </form>
                    <StyledTable.TableWrapper>
                        <StyledTable.TableContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader">اسم المتدرب</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader">الرقم الاكاديمي</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> رقم الجوال</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الشعب</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> المواد</StyledTable.TableTh>
                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                {StudentFound}
                            </StyledTable.TableBodyContainer>
                        </StyledTable.TableContainer>
                    </StyledTable.TableWrapper>
                </StyledTable.TableWithTitleWrapper>
            </div>
        )
    }
}
