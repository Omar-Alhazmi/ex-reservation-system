import React, { Component } from 'react'
import * as StyledTable from '../../Styles/styledTable'
import { getInstructors} from '../../ApiConfig/Api'
import InstructorEditForm from "./InstructorEditForm";
export default class InstructorsTable extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        Instructors:[],
        editClicked:false,
        currentInstructor:null
      }
    }
    componentDidMount(){
        this.getAllInstructors()
    }
    getAllInstructors() {
        getInstructors()
            .then((response) => {
                this.setState({ Instructors: response.data });
            })
            .catch((error) => {
            })
    }

    handleInstructorEdit = (index)=>{
        const {editClicked,Instructors} = this.state
        this.setState({editClicked:!editClicked,currentInstructor: Instructors[index]})
    }
    render() {
        const { Instructors,editClicked,currentInstructor } = this.state
        let allTimes = (
            <StyledTable.TableTr>
                <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
                <StyledTable.TableTd className="tableBody"><div class="spinner tableSp">Loading...</div></StyledTable.TableTd>
            </StyledTable.TableTr>)
        if (Instructors) {
            if (Instructors.length > 0) {
                allTimes = Instructors.map((Instructors, index) => {
                    return (
                        <StyledTable.TableTr key={index} onClick={this.handleInstructorEdit(index)}>
                            <StyledTable.TableTd className="tableBody single--icon">{Instructors.FullName}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody single--icon">{Instructors.InstructorReference.toString()}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody single--icon">{Instructors.Subject.toString()}</StyledTable.TableTd>
                            <StyledTable.TableTd className="tableBody single--icon">{Instructors.TeachStudents.length}</StyledTable.TableTd>
                        </StyledTable.TableTr>
                    )
                })
            }
        }
        return (
            <>
            {(editClicked)?<InstructorEditForm data={currentInstructor}/>:
                <StyledTable.TableWithTitleWrapper>
                    <StyledTable.TableWrapper>
                        <StyledTable.TableContainer>
                            <StyledTable.TableHedContainer>
                                <tr>
                                    <StyledTable.TableTh className="tableHeader">اسم المدرب</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> الشعب</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader">  المواد</StyledTable.TableTh>
                                    <StyledTable.TableTh className="tableHeader"> عدد المتدربين</StyledTable.TableTh>
                                </tr>
                            </StyledTable.TableHedContainer>
                            <StyledTable.TableBodyContainer>
                                {allTimes}
                            </StyledTable.TableBodyContainer>
                        </StyledTable.TableContainer>
                    </StyledTable.TableWrapper>
                </StyledTable.TableWithTitleWrapper>}
            </>
        )
    }
}
